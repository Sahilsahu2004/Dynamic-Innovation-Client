// Minimal payment backend for the Dynamic Innovations site.
//
// The frontend (src/lib/razorpay.js) currently opens Razorpay checkout
// directly with just an amount, using only your public key_id. That
// works, but the amount can technically be edited in the browser before
// the checkout opens, since there's no server confirming it.
//
// This server closes that gap:
//   1. POST /create-order  — frontend asks this server to create a
//      Razorpay order for a trusted, server-computed amount. Returns an
//      order_id that the frontend passes into checkout instead of a
//      raw amount.
//   2. POST /verify-payment — after payment, the frontend sends back
//      Razorpay's response; this server verifies the signature using
//      your key_secret (which must never be in frontend code) before
//      you treat the order as paid.
//
// Deploy this anywhere that runs Node (Render, Railway, a small VPS,
// or as serverless functions on Vercel/Netlify — split each route into
// its own function file if you go serverless).

import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Body: { amount: number (in rupees), notes?: object }
app.post('/create-order', async (req, res) => {
  try {
    const { amount, notes } = req.body
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'A positive amount is required' })
    }
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `di_${Date.now()}`,
      notes,
    })
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not create order' })
  }
})

// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (expected === razorpay_signature) {
    // TODO: mark the order as paid in your database, send a
    // confirmation email/WhatsApp, etc.
    res.json({ verified: true })
  } else {
    res.status(400).json({ verified: false, error: 'Signature mismatch' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Payment server running on port ${PORT}`))

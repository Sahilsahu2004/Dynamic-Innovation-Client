# Payment server (optional, for production)

The site works today with a client-only Razorpay checkout (see
`src/lib/razorpay.js`) — good enough for getting the payment flow
working and testing end to end. Before taking real customer money,
run this small server alongside the site so amounts are verified,
not just trusted from the browser.

## Setup

```bash
cd server
npm install
cp .env.example .env
# fill in your real RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
npm start
```

## Wiring it to the frontend

In `src/lib/razorpay.js`, instead of opening checkout with a raw
`amount`, call your deployed server first:

```js
const order = await fetch('https://your-server.com/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount, notes }),
}).then((r) => r.json())

// then pass order.id into the Razorpay options as `order_id`
// instead of a plain `amount`
```

After payment, send the response from Razorpay's `handler` to
`/verify-payment` before showing the "order placed" success state.

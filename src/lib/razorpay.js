// Replace with your real Razorpay Key ID from the Razorpay dashboard
// (Settings -> API Keys). This is the public "key_id", safe to expose
// client-side. Never put your key_secret in frontend code.
export const RAZORPAY_KEY_ID = 'rzp_test_REPLACE_WITH_YOUR_KEY'

let scriptPromise = null

export function loadRazorpayScript() {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'))
    document.body.appendChild(script)
  })
  return scriptPromise
}

/**
 * Opens the Razorpay checkout popup for a given amount (in INR).
 *
 * IMPORTANT — this is a client-only integration for getting the payment
 * flow working quickly. For production you should:
 *   1. Create the order server-side via the Razorpay Orders API (needs
 *      your key_secret, so it must run on a backend — see /server in
 *      this project for a starter Express endpoint).
 *   2. Pass the returned order_id into this checkout instead of a raw
 *      amount, so the amount can't be tampered with in the browser.
 *   3. Verify the payment signature server-side in handler.onSuccess
 *      before marking the order as paid.
 */
export async function openRazorpayCheckout({ amount, name, email, contact, notes, onSuccess, onDismiss }) {
  await loadRazorpayScript()

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // paise
    currency: 'INR',
    name: 'Dynamic Innovations',
    description: 'Packaging order advance payment',
    image: undefined,
    prefill: { name, email, contact },
    notes,
    theme: { color: '#c9a227' },
    handler: (response) => onSuccess?.(response),
    modal: { ondismiss: () => onDismiss?.() },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}

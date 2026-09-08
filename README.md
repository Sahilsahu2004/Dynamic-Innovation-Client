# Dynamic Innovations — Website

One-page site for Dynamic Innovations, a manufacturer and supplier of
HDPE/PP woven fabric and bags (Ahmedabad, Gujarat), with an
e-commerce layer (pricing, cart, Razorpay checkout), an interactive
"Build Your Bag" RFQ tool, and a navy + gold visual identity. Built
with React + Vite, Tailwind CSS v4, Framer Motion, and Lenis smooth
scrolling.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## What's in this version

- **Original copywriting** — hero headline, key metrics, About Us
  storytelling, product descriptions, and the industry-applications
  copy were rewritten from scratch rather than reused from the
  brochure PDF.
- **Navy + gold identity** — replaced the lime-green accent with a
  navy/gold palette (including a recoloured logo) for a more premium,
  distinct look. Tokens live in `src/index.css`.
- **Key Metrics bar** — floating trust bar under the hero with
  count-up numbers (`KeyMetrics.jsx`).
- **Interactive Product Matrix** — filter products by industry
  (`ProductCategories.jsx`), each with a Quick View popup, specs, and
  an indicative price.
- **Industry Applications tabs** — animated tabbed carousel
  (`IndustryApplications.jsx`).
- **Build Your Bag** — a material/capacity/feature configurator that
  builds a live summary and routes straight to a WhatsApp chat with
  the CEO (`BuildYourBag.jsx`).
- **Moisture-barrier compare slider** — a drag-to-compare view of
  laminated vs. standard fabric (`MoistureCompare.jsx`).
- **Cart, checkout, Razorpay** — from the previous version, still
  intact: `CartContext.jsx`, `CartDrawer.jsx`, `src/lib/razorpay.js`.
- **Motion** — magnetic CTA buttons (`MagneticButton.jsx`), a
  cursor-reactive woven-pattern background in the Hero
  (`WeavePattern.jsx`), a circular-loom preloader with a top loading
  bar (`Preloader.jsx`), 3D tilt-on-hover cards (`TiltCard.jsx`),
  scroll-triggered reveals, and animated underlines throughout.
- **Reviews** — still an honest empty state with a real
  write-a-review form; no fake reviews were added.

## What was asked for but isn't in here — and why

A few requested features need resources or engineering effort well
beyond a single site build, so rather than fake them with a shallow
CSS trick, they were left out with an explanation:

- **Real WebGL/Three.js 3D bag configurator with cloth physics and
  UV-mapped print preview.** This needs actual 3D models (scanned or
  modelled from the real bags) and a render pipeline — it's a
  standalone project on its own, not a component you add to a page.
  `TiltCard.jsx` gives a lightweight pseudo-3D tilt on hover as a
  stand-in.
- **Video background of looms/extrusion lines running.** No such
  footage was provided and none was available to source. The Hero
  uses the real product-photo collage with a subtle animated SVG
  weave pattern instead.
- **GSAP scroll-driven "thread weaving into a bag" vector animation.**
  Doable, but it's a bespoke illustration-plus-animation job (drawing
  the actual thread path frame by frame) rather than a quick add — a
  good candidate for a focused follow-up.
- **True stress-map / tensile simulation on a 3D bag.** Same
  constraint as the 3D configurator — needs a real model to overlay
  data on. The pricing/spec system in "Build Your Bag" covers the
  practical version of this (choose a capacity, see what's typically
  reinforced).
- **Custom shader ripple/liquid effects on fabric swatches, particle
  cursor trails.** These need a WebGL/canvas shader layer. Given the
  scope of everything else in this round, they were deprioritised
  in favour of the interactive tools (product matrix, Build Your Bag,
  moisture compare) that a real customer would actually use.

None of these are impossible — they're just each their own project.
Happy to scope any one of them properly if you want to prioritise it
next.

## Folder structure

```
src/
  assets/brand/               # logo (recoloured navy/gold) + product/factory photos
  data/products.js            # product catalogue: specs, pricing, industry/structure tags
  context/CartContext.jsx     # cart state, persisted to localStorage
  lib/razorpay.js             # Razorpay checkout loader (client-only — see Payments below)
  components/
    shared/
      Logo.jsx, RevealText.jsx, RevealImage.jsx, TiltCard.jsx,
      DrawUnderline.jsx, Modal.jsx, MagneticButton.jsx,
      WeavePattern.jsx, Preloader.jsx, SmoothScroll.jsx
    Navbar.jsx, Hero.jsx, KeyMetrics.jsx
    About.jsx, VisionMissionValues.jsx, ManufacturingProcess.jsx
    ProductCategories.jsx, ProductQuickView.jsx
    IndustryApplications.jsx, MoistureCompare.jsx, BuildYourBag.jsx
    Clients.jsx, MaterialsPrinting.jsx, CustomManufacturing.jsx
    Reviews.jsx, Gallery.jsx, Instagram.jsx
    EnquiryForm.jsx, ContactMap.jsx, Footer.jsx, WhatsAppFloat.jsx
    CartDrawer.jsx, CartToast.jsx
  App.jsx
  index.css
server/                        # optional Node backend for production payments
```

## Payments — read before going live

`openRazorpayCheckout()` opens Razorpay's popup directly from the
browser with just your public `key_id`. Fine for testing the flow,
but the amount is only trusted from the frontend. For real
transactions:

1. Get your keys from the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Put `RAZORPAY_KEY_ID` in `src/lib/razorpay.js`.
3. Deploy `server/` (see `server/README.md`) and wire `/create-order`
   + `/verify-payment` in, so amounts can't be edited client-side and
   payments are actually confirmed before you treat an order as paid.

## Pricing

`src/data/products.js` holds indicative "starting from" prices,
clearly marked as estimates in the UI. Update with real numbers
whenever the client provides a price list.

## Reviews

Still no fake reviews. `Reviews.jsx` has an honest empty state and a
working submission form that saves to the visitor's own browser
(`localStorage`) — connect a real backend (Firebase, Supabase, etc.)
before relying on it to collect reviews from real customers.

## Contact details in the site

- **Contact person:** Rahul Agrawal — CEO
- **Phone / WhatsApp:** +91 70095 50413
- **Email:** info@dynainnovate.com
- **Address:** Ahmedabad – 382210, Gujarat, India

## Design tokens (src/index.css)

| Token | Hex | Use |
|---|---|---|
| `--color-navy-deep` | `#060c16` | Darkest — Hero, Footer, Contact, Preloader |
| `--color-navy` | `#0e1b30` | Primary dark background |
| `--color-navy-soft` | `#1a2c47` | Lighter dark panel / hover |
| `--color-cream` | `#f7f7f1` | Light section background |
| `--color-gold` | `#c9a227` | Primary accent (CTAs, prices, highlights) |
| `--color-gold-soft` / `--color-gold-deep` | `#e6c869` / `#a3811c` | Tints for gradients & hover |
| `--color-charcoal` | `#20242b` | Body text on light backgrounds |

Fonts: Archivo Expanded (display headlines), Archivo (headings), Inter
(body), JetBrains Mono (small technical labels).

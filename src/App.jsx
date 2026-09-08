import { CartProvider } from './context/CartContext'
import SmoothScroll from './components/shared/SmoothScroll'
import Preloader from './components/shared/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import KeyMetrics from './components/KeyMetrics'
import About from './components/About'
import VisionMissionValues from './components/VisionMissionValues'
import ManufacturingProcess from './components/ManufacturingProcess'
import ProductCategories from './components/ProductCategories'
import IndustryApplications from './components/IndustryApplications'
import MoistureCompare from './components/MoistureCompare'
import BuildYourBag from './components/BuildYourBag'
import Clients from './components/Clients'
import MaterialsPrinting from './components/MaterialsPrinting'
import CustomManufacturing from './components/CustomManufacturing'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import EnquiryForm from './components/EnquiryForm'
import Instagram from './components/Instagram'
import ContactMap from './components/ContactMap'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import CartDrawer from './components/CartDrawer'
import CartToast from './components/CartToast'

export default function App() {
  return (
    <CartProvider>
      <Preloader />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <KeyMetrics />
          <About />
          <VisionMissionValues />
          <ManufacturingProcess />
          <ProductCategories />
          <IndustryApplications />
          <MoistureCompare />
          <BuildYourBag />
          <Clients />
          <MaterialsPrinting />
          <CustomManufacturing />
          <Reviews />
          <Gallery />
          <EnquiryForm />
          <Instagram />
          <ContactMap />
        </main>
        <Footer />
        <WhatsAppFloat />
        <CartDrawer />
        <CartToast />
      </SmoothScroll>
    </CartProvider>
  )
}

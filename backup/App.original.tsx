import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ScrollManager, SmoothScroll } from './components/layout/SmoothScroll'
import About from './pages/About'
import Brief from './pages/Brief'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Reviews from './pages/Reviews'
import Services from './pages/Services'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollManager />
      <Routes>
        <Route path="/brief" element={<Brief />} />
        <Route path="/project-brief" element={<Brief />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="services" element={<Services />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-and-conditions" element={<Legal slug="terms-and-conditions" />} />
          <Route path="privacy-policy" element={<Legal slug="privacy-policy" />} />
          <Route path="refund-policy" element={<Legal slug="refund-policy" />} />
          <Route path="cancellation-policy" element={<Legal slug="cancellation-policy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Collections } from './pages/Collections'
import { CollectionDetail } from './pages/CollectionDetail'
import { ProductDetail } from './pages/ProductDetail'
import { About } from './pages/About'
import { CartPage } from './pages/CartPage'
import { Contact } from './pages/Contact'
import { Journal } from './pages/Journal'
import { PrivacyPage, TermsPage } from './pages/LegalPlaceholder'
import { DesignYourOwn } from './pages/DesignYourOwn'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="design-your-own" element={<DesignYourOwn />} />
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:slug" element={<CollectionDetail />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="journal" element={<Journal />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

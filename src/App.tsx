import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ScrollManager, SmoothScroll } from '@/components/layout/SmoothScroll'
import Home from '@/pages/Home'

/**
 * Application routes.
 *
 * Only the home page is currently published. The remaining pages live in `/backup`
 * (`backup/App.original.tsx` has the full route table), and any unknown path falls
 * back to `/` until they are restored.
 */
export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

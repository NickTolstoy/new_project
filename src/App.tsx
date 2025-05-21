import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Импорт лейаутов
import MainLayout from './layouts/MainLayout'

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Reviews = lazy(() => import('./pages/Reviews'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contacts = lazy(() => import('./pages/Contacts'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Components = lazy(() => import('./pages/Components'))
const Admin = lazy(() => import('./pages/Admin'))

function App() {
  return (
    <Suspense fallback={<div className="loading">Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="components" element={<Components />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App 
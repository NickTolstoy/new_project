import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Breadcrumbs from '../components/common/Breadcrumbs'
import CookieConsent from '../components/CookieConsent'

const MainLayout = () => {
  const location = useLocation();
  
  // Проверяем, является ли текущая страница страницей конкретной услуги
  const isServiceDetailPage = /^\/services\/[^\/]+$/.test(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Отображаем Breadcrumbs только если это не страница конкретной услуги */}
      {!isServiceDetailPage && (
        <div className="bg-bg-secondary/90 border-b border-white/5 pt-24">
          <Breadcrumbs />
        </div>
      )}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Уведомление о согласии на сбор cookie */}
      <CookieConsent />
    </div>
  )
}

export default MainLayout 
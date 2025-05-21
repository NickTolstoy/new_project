import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Breadcrumbs from '../components/common/Breadcrumbs'
import PopupForm from '../components/PopupForm'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="bg-bg-secondary/90 border-b border-white/5 pt-24">
        <Breadcrumbs />
      </div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Всплывающая форма обратной связи */}
      <PopupForm />
    </div>
  )
}

export default MainLayout 
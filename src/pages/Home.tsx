import React, { useEffect } from 'react'
import Hero from '../components/home/Hero'
import ServiceCards from '../components/home/ServiceCards'
import Reviews from '../components/home/Reviews'
import Brands from '../components/home/Brands'
import CallToAction from '../components/home/CallToAction'

const Home = () => {
  useEffect(() => {
    // Устанавливаем заголовок страницы при монтировании компонента
    document.title = 'ЭлектроСервис - Обслуживание и ремонт электромобилей в Москве'
    
    // Добавляем метатеги для SEO
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Профессиональное обслуживание и ремонт электромобилей в Москве. Диагностика, ремонт высоковольтной батареи, обновление ПО и полный спектр услуг для электрокаров.'
      )
    }
    
    // Прокручиваем страницу вверх при загрузке
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      <Hero />
      <ServiceCards />
      <Reviews />
      <Brands />
      <CallToAction />
    </>
  )
}

export default Home 
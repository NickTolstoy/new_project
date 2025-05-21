import React, { useEffect } from 'react'
import HeroSlider from '../components/home/HeroSlider'
import ServiceCards from '../components/home/ServiceCards'
import Reviews from '../components/home/Reviews'
import Brands from '../components/home/Brands'
import CallToAction from '../components/home/CallToAction'
import ChargingMap from '../components/home/ChargingMap'
import SpecialOffers from '../components/home/SpecialOffers'

const Home = () => {
  useEffect(() => {
    // Устанавливаем заголовок страницы при монтировании компонента
    document.title = 'АвтосервисЛюбань - Обслуживание и ремонт электромобилей в Ленинградской области'
    
    // Добавляем метатеги для SEO
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Профессиональное обслуживание и ремонт электромобилей в Любани и Ленинградской области. Диагностика, ремонт высоковольтной батареи, обновление ПО и полный спектр услуг для электрокаров.'
      )
    }
    
    // Прокручиваем страницу вверх при загрузке
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
      <HeroSlider />
      <SpecialOffers />
      <ServiceCards />
      <Reviews />
      <Brands />
      <ChargingMap />
      <CallToAction />
    </>
  )
}

export default Home 
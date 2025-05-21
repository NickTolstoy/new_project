'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ReviewForm from '@/components/ReviewForm'
import { ContactFormData } from '@/components/shared/FormComponents'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<ContactFormData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Загрузка отзывов из localStorage
  useEffect(() => {
    const loadReviews = () => {
      const savedFormsJSON = localStorage.getItem('contactForms')
      if (savedFormsJSON) {
        try {
          const savedForms = JSON.parse(savedFormsJSON)
          // Фильтруем только отзывы и сортируем их по дате (от новых к старым)
          const reviewsOnly = savedForms
            .filter((form: ContactFormData) => form.service === 'review')
            .sort((a: ContactFormData, b: ContactFormData) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
          setReviews(reviewsOnly)
        } catch (err) {
          console.error('Ошибка при загрузке отзывов:', err)
          setReviews([])
        }
      } else {
        setReviews([])
      }
      setIsLoading(false)
    }
    
    loadReviews()
    
    // Добавляем слушатель события storage, чтобы обновлять список отзывов при изменении localStorage
    const handleStorageChange = () => {
      loadReviews()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Также создаем собственное событие, которое будет срабатывать при добавлении нового отзыва
    window.addEventListener('reviewAdded', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('reviewAdded', handleStorageChange)
    }
  }, [])
  
  // Рендерим звездный рейтинг для отображения
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Отзывы наших клиентов</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Мы гордимся качеством нашего обслуживания и работаем для вас. Отзывы клиентов помогают нам становиться лучше.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-pulse text-text-secondary">Загрузка отзывов...</div>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="glass-card rounded-xl p-6 border border-white/10 hover:shadow-neon transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{review.name}</h3>
                        <div className="flex items-center mt-1 mb-3">
                          <StarRating rating={review.rating || 5} />
                          <span className="ml-2 text-text-secondary text-sm">
                            {review.date.split(',')[0]}
                          </span>
                        </div>
                      </div>
                      {review.carModel && (
                        <div className="bg-bg-secondary/50 px-3 py-1 rounded-full text-sm text-text-secondary">
                          {review.carModel}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-text-primary">{review.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-bg-secondary/20 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold mb-2">Пока нет отзывов</h3>
                <p className="text-text-secondary mb-4">
                  Будьте первым, кто оставит отзыв о нашем сервисе
                </p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1 order-1 lg:order-2">
            <ReviewForm />
            
            <div className="mt-8 glass-card rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-xl mb-4">Почему стоит выбрать нас?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Специализация на электромобилях</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Сертифицированные специалисты</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Современное оборудование</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Гарантия на все виды работ</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <Link 
                  href="/services" 
                  className="inline-flex items-center text-accent-blue hover:text-accent-green transition-colors"
                >
                  <span>Наши услуги</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage 
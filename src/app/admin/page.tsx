'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Интерфейс для данных формы
interface ContactFormData {
  id: string;
  name: string;
  phone: string;
  email: string;
  carModel: string;
  service: string;
  message: string;
  date: string;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [forms, setForms] = useState<ContactFormData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()
  
  // Простая проверка пароля для админа (в реальном проекте нужна нормальная аутентификация)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Пароль: admin123 (в реальном проекте нужна безопасная авторизация через API)
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }
  
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    router.push('/')
  }
  
  // Получение данных форм из localStorage
  useEffect(() => {
    // Проверяем авторизацию
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    
    // Если авторизован, загружаем данные форм
    if (isAuthenticated) {
      const loadForms = () => {
        const savedFormsJSON = localStorage.getItem('contactForms')
        if (savedFormsJSON) {
          try {
            const savedForms = JSON.parse(savedFormsJSON)
            // Сортируем формы по дате отправки (от новых к старым)
            setForms(savedForms.sort((a: ContactFormData, b: ContactFormData) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            }))
          } catch (err) {
            console.error('Ошибка при загрузке данных форм:', err)
            setForms([])
          }
        } else {
          setForms([])
        }
        setIsLoading(false)
      }
      
      loadForms()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated])
  
  // Фильтрация форм по типу
  const filteredForms = activeTab === 'all' 
    ? forms 
    : forms.filter(form => form.service === activeTab)
  
  // Удаление формы
  const handleDeleteForm = (id: string) => {
    const updatedForms = forms.filter(form => form.id !== id)
    setForms(updatedForms)
    localStorage.setItem('contactForms', JSON.stringify(updatedForms))
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h2 className="text-2xl font-bold text-text-primary">Загрузка...</h2>
        </div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary p-6 flex flex-col items-center justify-center">
        <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-neon border border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-center text-gradient">Панель администратора</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-text-primary mb-2 font-medium">Пароль</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
                placeholder="Введите пароль"
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-bold transition-all duration-300 hover:shadow-neon hover:scale-105"
            >
              Войти
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-text-secondary hover:text-accent-blue transition-colors">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-6">
      <div className="glass-card shadow-neon border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-4 md:mb-0">Панель администратора</h1>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70 hover:text-text-primary transition-colors"
            >
              На сайт
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
        
        {/* Табы для фильтрации форм */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'all' 
                ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white' 
                : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70'
            } transition-colors`}
          >
            Все заявки
          </button>
          <button
            onClick={() => setActiveTab('popup')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'popup' 
                ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white' 
                : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70'
            } transition-colors`}
          >
            Всплывающая форма
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'contact' 
                ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white' 
                : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70'
            } transition-colors`}
          >
            Контактная форма
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'review' 
                ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white' 
                : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70'
            } transition-colors`}
          >
            Отзывы
          </button>
        </div>
        
        {/* Список заявок */}
        {filteredForms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">Заявок пока нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredForms.map(form => (
              <div 
                key={form.id} 
                className="bg-bg-secondary/30 border border-white/5 rounded-xl p-4 overflow-hidden hover:shadow-sm hover:border-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    form.service === 'popup' ? 'bg-blue-500/20 text-blue-400' :
                    form.service === 'contact' ? 'bg-green-500/20 text-green-400' :
                    form.service === 'review' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {form.service === 'popup' ? 'Всплывающая форма' :
                     form.service === 'contact' ? 'Контактная форма' :
                     form.service === 'review' ? 'Отзыв' : 'Другое'}
                  </span>
                  <button
                    onClick={() => handleDeleteForm(form.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Удалить заявку"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-xl mb-1">{form.name || 'Без имени'}</h3>
                  <p className="text-accent-blue">{form.phone || 'Телефон не указан'}</p>
                  {form.email && <p className="text-text-secondary">{form.email}</p>}
                </div>
                
                {form.message && (
                  <div className="mb-3">
                    <p className="text-text-secondary">{form.message}</p>
                  </div>
                )}
                
                {form.carModel && (
                  <div className="mb-3">
                    <span className="text-text-secondary text-sm">Модель: </span>
                    <span className="text-text-primary">{form.carModel}</span>
                  </div>
                )}
                
                <div className="text-right mt-2">
                  <span className="text-xs text-text-secondary/70">{form.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage 
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ContactFormData, NewsletterFormData } from '../components/shared/FormComponents'
import { 
  getAllForms, 
  deleteForm, 
  updateFormStatus, 
  adminLogin,
  getAllNewsletterSubscriptions,
  deleteNewsletterSubscription,
  updateNewsletterStatus 
} from '../utils/contactFormService.ts'
import { verifyReview, getReviews, updateReview, deleteReview } from '../utils/reviewsService.ts'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [forms, setForms] = useState<ContactFormData[]>([])
  const [newsletters, setNewsletters] = useState<NewsletterFormData[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('newsletter')
  const [processing, setProcessing] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<any>(null)
  const [editCarModel, setEditCarModel] = useState('')
  const [editService, setEditService] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = 'Панель администратора - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, [])
  
  // Проверка аутентификации через API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    try {
      const success = await adminLogin({ username, password });
      
      if (success) {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuth', 'true')
        setError('')
      } else {
        setError('Неверное имя пользователя или пароль')
      }
    } catch (err) {
      console.error('Ошибка при авторизации:', err)
      setError('Ошибка соединения с сервером')
    } finally {
      setProcessing(false)
    }
  }
  
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminToken')
    navigate('/')
  }
  
  // Загрузка данных с сервера
  const loadDataFromServer = async () => {
    try {
      setIsLoading(true)
      
      // Загружаем контактные формы
      const serverForms = await getAllForms()
      console.log('[DEBUG] Загружены формы:', serverForms)
      setForms(serverForms)
      
      // Загружаем подписки на новости
      console.log('[DEBUG] Начинаем загрузку подписок...')
      const serverNewsletters = await getAllNewsletterSubscriptions()
      console.log('[DEBUG] Загружены подписки:', serverNewsletters)
      setNewsletters(serverNewsletters)
      
      // Загружаем отзывы напрямую из базы данных
      const serverReviews = await getReviews()
      console.log('[DEBUG] Загружены отзывы:', serverReviews)
      setReviews(serverReviews)
      
    } catch (err) {
      console.error('[DEBUG] Ошибка при загрузке данных:', err)
      
      // Если не удалось загрузить с сервера, пробуем загрузить из localStorage
      try {
        const savedFormsJSON = localStorage.getItem('contactForms')
        if (savedFormsJSON) {
          const savedForms = JSON.parse(savedFormsJSON)
          // Сортируем формы по дате отправки (от новых к старым)
          setForms(savedForms.sort((a: ContactFormData, b: ContactFormData) => {
            return new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
          }))
        } else {
          setForms([])
        }
      } catch (localErr) {
        console.error('Ошибка при загрузке из localStorage:', localErr)
        setForms([])
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  // Получение данных форм с сервера
  useEffect(() => {
    // Проверяем авторизацию
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    
    // Если авторизован, загружаем данные форм с сервера
    if (isAuthenticated) {
      loadDataFromServer()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated])
  
  // Фильтрация форм по типу
  const filteredForms = activeTab === 'all' 
    ? forms 
    : activeTab === 'contact'
      ? forms.filter(form => form.formType === 'popup') // Для вкладки "Обратная связь" - формы с типом "popup"
      : activeTab === 'service' 
        ? forms.filter(form => form.formType === 'service' || form.formType === 'contact') // Для вкладки "Запись на сервис" - формы с типом "service" или "contact"
        : forms.filter(form => form.formType === activeTab);
  
  // Удаление формы через API
  const handleDeleteForm = async (id: string | number) => {
    try {
      setProcessing(true)
      const success = await deleteForm(id)
      
      if (success) {
        // Обновляем состояние после успешного удаления
        const updatedForms = forms.filter(form => form.id !== id)
        setForms(updatedForms)
      } else {
        setError('Не удалось удалить форму. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при удалении формы:', err)
      setError('Произошла ошибка при удалении формы')
    } finally {
      setProcessing(false)
    }
  }
  
  // Обновление статуса формы (отметка обработанной)
  const handleMarkAsProcessed = async (id: string | number) => {
    try {
      setProcessing(true)
      const success = await updateFormStatus(id, { 
        isProcessed: true,
        processedBy: 'admin' // В реальном приложении здесь будет имя текущего администратора
      })
      
      if (success) {
        // Обновляем состояние после успешного обновления
        const updatedForms = forms.map(form => 
          form.id === id ? { ...form, isProcessed: true, processedAt: new Date().toISOString() } : form
        )
        setForms(updatedForms)
      } else {
        setError('Не удалось обновить статус формы. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при обновлении статуса формы:', err)
      setError('Произошла ошибка при обновлении статуса')
    } finally {
      setProcessing(false)
    }
  }
  
  // Верификация отзыва
  const handleVerifyReview = async (id: string | number) => {
    try {
      setProcessing(true)
      const success = await verifyReview(id)
      
      if (success) {
        // Обновляем состояние после успешной верификации
        const updatedForms = forms.map(form => {
          if (form.id === id && form.formType === 'review') {
            return { 
              ...form, 
              isProcessed: true, 
              processedAt: new Date().toISOString(),
              verified: true  // Устанавливаем логическое true, а не числовое 1
            }
          }
          return form
        })
        setForms(updatedForms)
        
        // Показываем сообщение об успехе
        alert('Отзыв успешно верифицирован. Теперь он будет отображаться как проверенный на сайте.')
        
        // Обновляем отзывы из базы данных (принудительно)
        try {
          // Здесь можно было бы сделать дополнительный API-запрос для 
          // обновления данных или вызвать колбэк, но в текущей реализации
          // это не требуется, так как verifyReview уже вызывает API
        } catch (e) {
          console.error('Не удалось обновить список отзывов после верификации:', e)
        }
      } else {
        setError('Не удалось верифицировать отзыв. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при верификации отзыва:', err)
      setError('Произошла ошибка при верификации отзыва')
    } finally {
      setProcessing(false)
    }
  }
  
  // Удаление отзыва через API
  const handleDeleteReview = async (id: string | number) => {
    try {
      if (!confirm('Вы уверены, что хотите удалить этот отзыв? Это действие невозможно отменить.')) {
        return;
      }
      
      console.log(`[ADMIN] Начинаем удаление отзыва с ID ${id}`);
      setProcessing(true);
      setError(''); // Сбрасываем предыдущие ошибки
      
      // Находим информацию об отзыве перед удалением (для логирования)
      const reviewToDelete = reviews.find(review => review.id === id);
      if (reviewToDelete) {
        console.log(`[ADMIN] Удаляется отзыв: Автор: ${reviewToDelete.author}, Текст: ${reviewToDelete.text}`);
      }
      
      const success = await deleteReview(id);
      
      if (success) {
        console.log(`[ADMIN] Успешно удален отзыв с ID ${id}`);
        
        // Обновляем состояние после успешного удаления
        console.log(`[ADMIN] Обновляем список отзывов в интерфейсе`);
        const updatedReviews = reviews.filter(review => Number(review.id) !== Number(id));
        console.log(`[ADMIN] Было отзывов: ${reviews.length}, стало: ${updatedReviews.length}`);
        setReviews(updatedReviews);
        
        // Также обновляем формы, если отзыв был привязан к форме
        console.log(`[ADMIN] Обновляем список форм в интерфейсе`);
        const updatedForms = forms.filter(form => 
          !(form.formType === 'review' && Number(form.id) === Number(id))
        );
        setForms(updatedForms);
        
        // Дополнительная проверка удаления отзыва с сервера
        try {
          console.log(`[ADMIN] Выполняем дополнительную проверку удаления отзыва с ID ${id}`);
          
          // Принудительно обновляем страницу для гарантированного обновления
          alert('Отзыв успешно удален. Страница будет перезагружена для обновления данных.');
          window.location.reload();
        } catch (reloadErr) {
          console.error('[ADMIN] Ошибка при обновлении страницы:', reloadErr);
          setProcessing(false);
          alert('Отзыв удален, но возникли проблемы с обновлением страницы. Перезагрузите страницу вручную.');
        }
      } else {
        console.error(`[ADMIN] Не удалось удалить отзыв с ID ${id}`);
        setError('Не удалось удалить отзыв. Попробуйте позже.');
        setProcessing(false);
      }
    } catch (err) {
      console.error('[ADMIN] Критическая ошибка при удалении отзыва:', err);
      setError('Произошла ошибка при удалении отзыва: ' + (err instanceof Error ? err.message : String(err)));
      setProcessing(false);
    }
  }
  
  // Открытие модального окна для редактирования отзыва
  const handleOpenEditModal = (review: any) => {
    setEditingReview(review)
    setEditCarModel(review.car || '')
    setEditService(review.service || '')
    setIsEditModalOpen(true)
  }
  
  // Обновление отзыва
  const handleUpdateReview = async () => {
    if (!editingReview) return
    
    try {
      setProcessing(true)
      
      const success = await updateReview(editingReview.id, {
        carModel: editCarModel,
        service: editService
      })
      
      if (success) {
        // Обновляем состояние после успешного обновления
        const updatedReviews = reviews.map(review => {
          if (review.id === editingReview.id) {
            return { 
              ...review, 
              car: editCarModel,
              service: editService
            }
          }
          return review
        })
        setReviews(updatedReviews)
        
        // Закрываем модальное окно
        setIsEditModalOpen(false)
        setEditingReview(null)
        
        // Показываем сообщение об успехе
        alert('Отзыв успешно обновлен.')
      } else {
        setError('Не удалось обновить отзыв. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при обновлении отзыва:', err)
      setError('Произошла ошибка при обновлении отзыва')
    } finally {
      setProcessing(false)
    }
  }
  
  // Удаление подписки на новости
  const handleDeleteNewsletter = async (id: string | number) => {
    try {
      if (!confirm('Вы уверены, что хотите удалить эту подписку? Это действие невозможно отменить.')) {
        return;
      }
      
      setProcessing(true)
      const success = await deleteNewsletterSubscription(id)
      
      if (success) {
        // Обновляем состояние после успешного удаления
        const updatedNewsletters = newsletters.filter(item => item.id !== id)
        setNewsletters(updatedNewsletters)
        
        alert('Подписка успешно удалена.')
      } else {
        setError('Не удалось удалить подписку. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при удалении подписки:', err)
      setError('Произошла ошибка при удалении подписки')
    } finally {
      setProcessing(false)
    }
  }
  
  // Обновление статуса подписки на новости (активна/неактивна)
  const handleToggleNewsletterStatus = async (id: string | number, currentStatus: boolean) => {
    try {
      setProcessing(true)
      const success = await updateNewsletterStatus(id, { isActive: !currentStatus })
      
      if (success) {
        // Обновляем состояние после успешного обновления
        const updatedNewsletters = newsletters.map(item => 
          item.id === id ? { ...item, isActive: !currentStatus } : item
        )
        setNewsletters(updatedNewsletters)
      } else {
        setError('Не удалось обновить статус подписки. Попробуйте позже.')
      }
    } catch (err) {
      console.error('Ошибка при обновлении статуса подписки:', err)
      setError('Произошла ошибка при обновлении статуса подписки')
    } finally {
      setProcessing(false)
    }
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
              <label htmlFor="username" className="block text-text-primary mb-2 font-medium">Имя пользователя</label>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
                placeholder="admin"
              />
            </div>
            
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
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 disabled:opacity-70"
              disabled={processing}
            >
              {processing ? 'Подождите...' : 'Войти'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-text-secondary hover:text-accent-blue transition-colors">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-24 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={loadDataFromServer}
            className="px-4 py-2 rounded-lg bg-accent-blue/20 text-accent-blue border border-accent-blue/30 hover:bg-accent-blue/30 transition-colors"
            disabled={processing || isLoading}
          >
            {processing || isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-accent-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Обновление...
              </span>
            ) : "Обновить данные"}
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/20 hover:bg-red-600/30 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-600/20 border border-red-600/20 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      <div className="glass-card rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Управление данными</h2>
        
        <div className="border-b border-white/10 mb-6">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'all' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'}`}
              onClick={() => setActiveTab('all')}
            >
              Все заявки
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'contact' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'}`}
              onClick={() => setActiveTab('contact')}
            >
              Обратная связь
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'service' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'}`}
              onClick={() => setActiveTab('service')}
            >
              Запись на сервис
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'review' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'}`}
              onClick={() => setActiveTab('review')}
            >
              Отзывы
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'newsletter' ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-secondary'}`}
              onClick={() => setActiveTab('newsletter')}
            >
              Подписки на новости
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-blue"></div>
            <p className="mt-2 text-text-secondary">Загрузка данных...</p>
          </div>
        ) : (
          <>
            {activeTab === 'newsletter' ? (
              // Таблица с подписчиками на новости
              <div className="overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Подписки на новости</h2>
                </div>
                <table className="min-w-full divide-y divide-white/10">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary tracking-wider">Имя</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary tracking-wider">Дата подписки</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary tracking-wider">Статус</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {newsletters.length > 0 ? (
                      newsletters.map((item) => (
                        <tr key={item.id} className="hover:bg-bg-secondary/30 transition-colors">
                          <td className="px-4 py-4 text-sm">{item.email}</td>
                          <td className="px-4 py-4 text-sm">{item.name || '—'}</td>
                          <td className="px-4 py-4 text-sm">
                            {item.date ? new Date(item.date).toLocaleString('ru-RU') : '—'}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.isActive 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {item.isActive ? 'Активна' : 'Неактивна'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-right space-x-2">
                            <button 
                              onClick={() => item.id !== undefined && handleToggleNewsletterStatus(item.id, !!item.isActive)}
                              className={`px-2 py-1 text-xs rounded border ${
                                item.isActive 
                                  ? 'border-red-600/20 text-red-400 hover:bg-red-600/20' 
                                  : 'border-green-600/20 text-green-400 hover:bg-green-600/20'
                              } transition-colors`}
                              disabled={processing}
                            >
                              {item.isActive ? 'Деактивировать' : 'Активировать'}
                            </button>
                            <button 
                              onClick={() => item.id !== undefined && handleDeleteNewsletter(item.id)}
                              className="px-2 py-1 text-xs rounded border border-red-600/20 text-red-400 hover:bg-red-600/20 transition-colors"
                              disabled={processing}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-text-secondary">
                          Нет подписок на новости
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              // Существующая таблица с заявками и формами
              <>
                {/* Если выбраны отзывы из базы данных */}
                {activeTab === 'review' && (
                  <div className="overflow-x-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Отзывы из базы данных</h2>
                    
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-bg-secondary/50">
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Дата</th>
                          <th className="px-4 py-2 text-left">Автор</th>
                          <th className="px-4 py-2 text-left">Рейтинг</th>
                          <th className="px-4 py-2 text-left">Авто</th>
                          <th className="px-4 py-2 text-left">Услуга</th>
                          <th className="px-4 py-2 text-left">Текст</th>
                          <th className="px-4 py-2 text-left">Статус</th>
                          <th className="px-4 py-2 text-left">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="px-4 py-8 text-center text-text-secondary">
                              Отзывов не найдено
                            </td>
                          </tr>
                        ) : (
                          reviews.map((review) => (
                            <tr 
                              key={review.id} 
                              className="border-b border-white/5 hover:bg-bg-secondary/30 transition-colors"
                            >
                              <td className="px-4 py-3">
                                {review.id}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {review.date}
                              </td>
                              <td className="px-4 py-3">
                                {review.author}
                              </td>
                              <td className="px-4 py-3">
                                {review.rating} / 5
                              </td>
                              <td className="px-4 py-3">
                                {review.car || '—'}
                              </td>
                              <td className="px-4 py-3">
                                {review.service || '—'}
                              </td>
                              <td className="px-4 py-3 text-sm max-w-xs truncate">
                                {review.text}
                              </td>
                              <td className="px-4 py-3">
                                <div className={`px-3 py-1 rounded-full text-xs inline-block
                                  ${review.verified ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}
                                `}>
                                  {review.verified ? 'Проверенный отзыв' : 'Непроверенный отзыв'}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex space-x-2">
                                  {!review.verified && (
                                    <button
                                      onClick={() => handleVerifyReview(review.id)}
                                      disabled={processing}
                                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                      title="Верифицировать отзыв"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleOpenEditModal(review)}
                                    disabled={processing}
                                    className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                                    title="Редактировать отзыв"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteReview(review.id)}
                                    disabled={processing}
                                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                    title="Удалить"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Таблица заявок (для остальных вкладок) */}
                {activeTab !== 'review' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-bg-secondary/50">
                          <th className="px-4 py-2 text-left">Дата</th>
                          <th className="px-4 py-2 text-left">Имя</th>
                          <th className="px-4 py-2 text-left">Контакты</th>
                          <th className="px-4 py-2 text-left">Тип заявки</th>
                          <th className="px-4 py-2 text-left">Сообщение</th>
                          <th className="px-4 py-2 text-left">Статус</th>
                          <th className="px-4 py-2 text-left">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredForms.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                              Заявок не найдено
                            </td>
                          </tr>
                        ) : (
                          filteredForms.map((form) => (
                            <tr 
                              key={form.id} 
                              className="border-b border-white/5 hover:bg-bg-secondary/30 transition-colors"
                            >
                              <td className="px-4 py-3 text-sm">
                                {form.date ? new Date(form.date).toLocaleString('ru-RU') : '—'}
                              </td>
                              <td className="px-4 py-3">
                                {form.name}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div>Тел: {form.phone || '—'}</div>
                                <div>Email: {form.email || '—'}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className={`px-3 py-1 rounded-full text-xs inline-block
                                  ${form.formType === 'contact' ? 'bg-blue-500/20 text-blue-400' : ''}
                                  ${form.formType === 'service' ? 'bg-green-500/20 text-green-400' : ''}
                                  ${form.formType === 'review' ? 'bg-purple-500/20 text-purple-400' : ''}
                                  ${form.formType === 'newsletter' ? 'bg-orange-500/20 text-orange-400' : ''}
                                  ${form.formType === 'popup' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                `}>
                                  {form.formType === 'contact' && 'Контактная форма'}
                                  {form.formType === 'service' && 'Запись на сервис'}
                                  {form.formType === 'review' && 'Отзыв'}
                                  {form.formType === 'newsletter' && 'Подписка на новости'}
                                  {form.formType === 'popup' && 'Запрос обратного звонка'}
                                  {!form.formType && 'Неизвестно'}
                                </div>
                                {form.service && (
                                  <div className="text-xs text-text-secondary mt-1">
                                    Услуга: {form.service}
                                  </div>
                                )}
                                {form.carModel && (
                                  <div className="text-xs text-text-secondary">
                                    Авто: {form.carModel}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm max-w-xs truncate">
                                {form.message}
                              </td>
                              <td className="px-4 py-3">
                                <div className={`px-3 py-1 rounded-full text-xs inline-block
                                  ${form.isProcessed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                                `}>
                                  {form.isProcessed ? 'Обработана' : 'Новая'}
                                </div>
                                {form.isProcessed && form.processedAt && (
                                  <div className="text-xs text-text-secondary mt-1">
                                    {new Date(form.processedAt).toLocaleString('ru-RU')}
                                  </div>
                                )}
                                {form.formType === 'review' && (
                                  <div className={`px-3 py-1 rounded-full text-xs inline-block mt-2
                                    ${form.verified ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}
                                  `}>
                                    {form.verified ? 'Проверенный отзыв' : 'Непроверенный отзыв'}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex space-x-2">
                                  {!form.isProcessed && (
                                    <button
                                      onClick={() => form.id !== undefined && handleMarkAsProcessed(form.id)}
                                      disabled={processing}
                                      className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                      title="Отметить как обработанную"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>
                                  )}
                                  {form.formType === 'review' && !form.verified && (
                                    <button
                                      onClick={() => form.id !== undefined && handleVerifyReview(form.id)}
                                      disabled={processing}
                                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                      title="Верифицировать отзыв"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => form.id !== undefined && handleDeleteForm(form.id)}
                                    disabled={processing}
                                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                    title="Удалить"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      
      {/* Модальное окно редактирования отзыва */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-bg-secondary p-6 rounded-xl shadow-lg max-w-md w-full border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Редактирование отзыва</h3>
            
            <div className="mb-4">
              <label htmlFor="carModel" className="block text-text-secondary mb-1">Модель автомобиля</label>
              <input 
                type="text" 
                id="carModel"
                value={editCarModel}
                onChange={(e) => setEditCarModel(e.target.value)}
                className="w-full bg-bg-primary/50 border border-white/10 rounded-lg py-2 px-3 text-text-primary"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="service" className="block text-text-secondary mb-1">Услуга</label>
              <input 
                type="text" 
                id="service"
                value={editService}
                onChange={(e) => setEditService(e.target.value)}
                className="w-full bg-bg-primary/50 border border-white/10 rounded-lg py-2 px-3 text-text-primary"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-bg-primary/50 text-text-secondary"
                disabled={processing}
              >
                Отмена
              </button>
              <button
                onClick={handleUpdateReview}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-green text-white"
                disabled={processing}
              >
                {processing ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin 
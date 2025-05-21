import React, { useEffect, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

// Определим интерфейс для данных формы локально
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

const Contacts = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [carModel, setCarModel] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [savedForms, setSavedForms] = useState<ContactFormData[]>([])
  const [adminPassword, setAdminPassword] = useState('')
  const [passwordCorrect, setPasswordCorrect] = useState(false)
  
  useEffect(() => {
    document.title = 'Контакты - АвтосервисЛюбань'
    window.scrollTo(0, 0)
    
    // Загрузить сохраненные формы из localStorage
    const loadForms = () => {
      const saved = localStorage.getItem('contactForms')
      if (saved) {
        try {
          setSavedForms(JSON.parse(saved))
        } catch (e) {
          console.error('Ошибка при загрузке форм из хранилища:', e)
          localStorage.removeItem('contactForms')
        }
      }
    }
    
    loadForms()
    
    // Показ админ-панели по хэшу в URL
    if (window.location.hash === '#admin') {
      setShowAdmin(true)
    }
  }, [])
  
  const checkPassword = () => {
    // Простой пароль для демонстрации
    if (adminPassword === 'admin123') {
      setPasswordCorrect(true)
    } else {
      alert('Неверный пароль')
    }
  }
  
  const clearAllForms = () => {
    if (confirm('Вы уверены, что хотите удалить все заявки?')) {
      localStorage.removeItem('contactForms')
      setSavedForms([])
    }
  }
  
  const deleteForm = (id: string) => {
    const newForms = savedForms.filter(form => form.id !== id)
    setSavedForms(newForms)
    localStorage.setItem('contactForms', JSON.stringify(newForms))
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Базовая валидация
    if (!name.trim() || !phone.trim()) {
      setError('Необходимо указать имя и телефон')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    // Имитация отправки данных (задержка 1.5 секунды)
    setTimeout(() => {
      // Создаем новую форму с ID и датой
      const newForm: ContactFormData = {
        id: Date.now().toString(),
        name,
        phone,
        email,
        carModel,
        service,
        message,
        date: new Date().toLocaleString('ru')
      }
      
      // Сохраняем в localStorage
      const forms = [...savedForms, newForm]
      localStorage.setItem('contactForms', JSON.stringify(forms))
      setSavedForms(forms)
      
      console.log('Форма сохранена:', newForm)
      
      // Имитация успешной отправки
      setIsSubmitted(true)
      
      // Очистка формы
      setName('')
      setPhone('')
      setEmail('')
      setCarModel('')
      setService('')
      setMessage('')
      
      // Сброс статуса отправки через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
      
      setIsSubmitting(false)
    }, 1500)
  }
  
  const serviceLabels: Record<string, string> = {
    'battery': 'Ремонт батареи',
    'diagnostics': 'Диагностика',
    'software': 'Обновление ПО',
    'engine': 'Ремонт двигателя',
    'charging': 'Обслуживание зарядных станций',
    'other': 'Другое',
    '': 'Не указано'
  }
  
  return (
    <>
      {/* Админ-панель */}
      {showAdmin && (
        <section className="py-8 bg-bg-secondary">
          <div className="container">
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Панель управления заявками</h2>
              
              {!passwordCorrect ? (
                <div className="flex items-center space-x-4">
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="px-4 py-2 bg-bg-secondary/50 rounded-lg border border-white/10"
                  />
                  <button
                    onClick={checkPassword}
                    className="px-4 py-2 rounded-lg bg-accent-blue text-white"
                  >
                    Войти
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Список заявок: {savedForms.length}</h3>
                    <button
                      onClick={clearAllForms}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Очистить все
                    </button>
                  </div>
                  
                  {savedForms.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                      Нет сохраненных заявок
                    </div>
                  ) : (
                    <div className="overflow-auto max-h-96">
                      {savedForms.map(form => (
                        <div key={form.id} className="glass-card p-4 mb-4 rounded-lg">
                          <div className="flex justify-between">
                            <div className="text-lg font-semibold">{form.name}</div>
                            <button
                              onClick={() => deleteForm(form.id)}
                              className="text-red-400 hover:text-red-500"
                            >
                              &times;
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div><span className="text-text-secondary">Телефон:</span> {form.phone}</div>
                            <div><span className="text-text-secondary">Email:</span> {form.email || 'Не указан'}</div>
                            <div><span className="text-text-secondary">Модель:</span> {form.carModel || 'Не указана'}</div>
                            <div><span className="text-text-secondary">Услуга:</span> {serviceLabels[form.service]}</div>
                            <div className="col-span-2"><span className="text-text-secondary">Сообщение:</span> {form.message || 'Нет сообщения'}</div>
                            <div className="col-span-2 text-right text-sm text-text-secondary">{form.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Шапка страницы */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Контакты
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Свяжитесь с нами для получения консультации, записи на обслуживание 
              или решения любых вопросов по электромобилям.
            </p>
          </div>
        </div>
      </section>
      
      {/* Основная информация */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Форма обратной связи */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 rounded-xl"
                id="form"
              >
                <h2 className="text-2xl font-bold mb-6">Оставьте заявку</h2>
                
                {isSubmitted ? (
                  <div className="bg-accent-green/10 border border-accent-green/30 rounded-lg p-6 text-center">
                    <svg className="w-16 h-16 text-accent-green mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
                    <p className="text-text-secondary">
                      Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
                        <p className="text-red-400">{error}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-text-secondary mb-2">Имя *</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-text-secondary mb-2">Телефон *</label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-text-secondary mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="car" className="block text-text-secondary mb-2">Модель электромобиля</label>
                        <input
                          type="text"
                          id="car"
                          value={carModel}
                          onChange={(e) => setCarModel(e.target.value)}
                          className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                          placeholder="Например, Tesla Model 3"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="service" className="block text-text-secondary mb-2">Интересующая услуга</label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                      >
                        <option value="">Выберите услугу</option>
                        <option value="battery">Ремонт батареи</option>
                        <option value="diagnostics">Диагностика</option>
                        <option value="software">Обновление ПО</option>
                        <option value="engine">Ремонт двигателя</option>
                        <option value="charging">Обслуживание зарядных станций</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-text-secondary mb-2">Сообщение</label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-bg-secondary/50 rounded-lg border border-white/10 text-text-primary focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all resize-none"
                        placeholder="Опишите ваш запрос или проблему..."
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-text-secondary">
                          Я согласен на обработку персональных данных и принимаю 
                          <a href="#" className="text-accent-blue hover:text-accent-green"> политику конфиденциальности</a>.
                        </span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-[1.02] flex items-center justify-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Отправка...
                        </>
                      ) : (
                        'Отправить заявку'
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
            
            {/* Контактная информация */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-start">
                      <div className="bg-bg-secondary/50 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Телефон</h3>
                        <a href="tel:+78001234567" className="text-text-secondary hover:text-accent-blue transition-colors">8 (800) 123-45-67</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-start">
                      <div className="bg-bg-secondary/50 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <a href="mailto:nickteamofpro@yandex.ru" className="text-text-secondary hover:text-accent-blue transition-colors">nickteamofpro@yandex.ru</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl mb-10">
                  <div className="flex items-start">
                    <div className="bg-bg-secondary/50 p-3 rounded-full mr-4 mt-1">
                      <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Адрес</h3>
                      <p className="text-text-secondary mb-2">
                        Москва, ул. Электрозаводская, 27с1A
                      </p>
                      <p className="text-text-secondary">
                        <span className="font-medium">Время работы:</span><br/>
                        Пн-Пт: 9:00 - 21:00<br/>
                        Сб-Вс: 10:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl mb-6">
                  <h3 className="font-bold mb-4">Мы в социальных сетях</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-bg-secondary/50 p-3 rounded-full text-text-secondary hover:text-accent-blue transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.579 6.855c.14-.465 0-.806-.666-.806h-2.2c-.56 0-.817.29-.956.61 0 0-1.12 2.72-2.695 4.488-.512.513-.745.675-1.023.675-.14 0-.352-.162-.352-.627V6.855c0-.558-.159-.806-.618-.806H9.642c-.348 0-.557.26-.557.504 0 .528.791.65.872 2.138v3.228c0 .707-.128.836-.41.836-.745 0-2.558-2.729-3.629-5.853-.21-.607-.42-.846-.983-.846h-2.2c-.624 0-.75.29-.75.61 0 .571.745 3.405 3.472 7.153 1.816 2.558 4.376 3.943 6.707 3.943 1.395 0 1.567-.313 1.567-.853v-1.966c0-.628.133-.753.576-.753.326 0 .887.164 2.195 1.421 1.495 1.495 1.743 2.168 2.584 2.168h2.2c.624 0 .936-.313.757-.93-.197-.613-.905-1.499-1.844-2.552-.512-.604-1.279-1.254-1.51-1.579-.326-.418-.233-.604 0-.975.001 0 2.672-3.763 2.95-5.04z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-bg-secondary/50 p-3 rounded-full text-text-secondary hover:text-accent-blue transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0Zm0 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 11.944 2ZM8.67 7.867l6.214 3.28a.5.5 0 0 1 0 .866l-6.214 3.281a.5.5 0 0 1-.724-.447V8.314a.5.5 0 0 1 .724-.447Z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-bg-secondary/50 p-3 rounded-full text-text-secondary hover:text-accent-blue transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Карта */}
      <section className="py-8 pb-16">
        <div className="container">
          <div className="glass-card rounded-xl overflow-hidden p-2">
            {/* Здесь можно добавить карту через iframe или API Яндекс/Google Карт */}
            <div className="aspect-video bg-bg-secondary/80 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-accent-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-text-secondary">
                  Здесь будет карта с расположением сервиса<br/>
                  <span className="text-sm">Москва, ул. Электрозаводская, 27с1A</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacts 
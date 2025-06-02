import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const About = () => {
  useEffect(() => {
    document.title = 'О нас - АвтосервисЛюбань'
    window.scrollTo(0, 0)
  }, [])
  
  // Список преимуществ
  const advantages = [
    {
      id: 1,
      title: 'Опыт и профессионализм',
      description: 'Наши специалисты имеют многолетний опыт работы с электромобилями всех популярных марок и регулярно проходят обучение у производителей.',
      icon: (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Современное оборудование',
      description: 'Мы используем профессиональное диагностическое оборудование и специализированные инструменты для работы с высоковольтными системами.',
      icon: (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Гарантия качества',
      description: 'Мы предоставляем гарантию на все виды выполняемых работ. Ваш электромобиль в надежных руках!',
      icon: (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Прозрачное ценообразование',
      description: 'Никаких скрытых платежей и неожиданных наценок. Стоимость работ согласовывается до начала ремонта.',
      icon: (
        <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  // Список команды
  const team = [
    {
      id: 1,
      name: 'Александр Петров',
      position: 'Главный инженер',
      photo: '/images/team/alexander.webp',
      experience: '10+ лет опыта'
    },
    {
      id: 2,
      name: 'Екатерина Соколова',
      position: 'Специалист по диагностике',
      photo: '/images/team/ekaterina.webp',
      experience: '7 лет опыта'
    },
    {
      id: 3,
      name: 'Михаил Волков',
      position: 'Инженер по высоковольтным системам',
      photo: '/images/team/mikhail.webp',
      experience: '8 лет опыта'
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      position: 'Специалист по программному обеспечению',
      photo: '/images/team/dmitry.webp',
      experience: '6 лет опыта'
    }
  ];
  
  // Анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      {/* Шапка страницы */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-bg-secondary to-bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              О нашей компании
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              Профессиональный сервис обслуживания электромобилей 
              с опытом и современным оборудованием.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* История компании */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 md:p-12 rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-accent-blue to-accent-green h-8 w-1 rounded mr-3"></span>
                  Наша история
                </h2>
                <div className="space-y-4">
                  <p className="text-text-secondary">
                    Компания "АвтосервисЛюбань" была основана в 2018 году группой энтузиастов электромобилей, которые увидели растущую потребность в специализированных сервисах для владельцев электротранспорта.
                  </p>
                  <p className="text-text-secondary">
                    Начав с небольшой мастерской и обслуживания нескольких марок электромобилей, мы постоянно расширяли свои знания, инвестировали в современное оборудование и обучение персонала.
                  </p>
                  <p className="text-text-secondary">
                    Сегодня "АвтосервисЛюбань" — это команда высококвалифицированных специалистов, которые любят свою работу и постоянно совершенствуют свои навыки. Мы обслуживаем все популярные марки электромобилей и гибридов, предлагая полный спектр услуг: от базовой диагностики до сложного ремонта высоковольтных систем.
                  </p>
                  <p className="text-text-secondary">
                    Наша миссия — сделать эксплуатацию электромобилей максимально комфортной и безопасной для наших клиентов, обеспечивая квалифицированное обслуживание и поддержку.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/company-history.jpg" 
                  alt="История компании АвтосервисЛюбань" 
                  className="rounded-xl shadow-lg hover:shadow-accent-blue/20 hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-accent-blue to-accent-green text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                  С 2018 года
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Наши преимущества */}
      <section className="py-16 bg-gradient-to-b from-bg-secondary/70 to-transparent">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              Почему выбирают нас
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Наш сервис отличает высокий профессионализм, внимание к деталям 
              и постоянное стремление к совершенству.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {advantages.map((advantage) => (
              <motion.div
                key={advantage.id}
                variants={item}
                className="glass-card p-6 rounded-xl h-full shadow-lg hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-br from-accent-blue/20 to-accent-green/20 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                    <p className="text-text-secondary">{advantage.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Наша команда */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              Наша команда
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Профессионалы своего дела, которые обеспечивают качественное обслуживание 
              и гарантируют безопасность вашего электромобиля.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {team.map((member) => (
              <motion.div
                key={member.id}
                variants={item}
                className="glass-card rounded-xl overflow-hidden text-center shadow-lg hover:shadow-neon transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-blue to-accent-green text-white text-sm font-bold px-4 py-1 rounded-full">
                    {member.experience}
                  </div>
                  <h3 className="text-xl font-bold mt-2">{member.name}</h3>
                  <p className="text-accent-blue mb-2">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-14"
          >
            <Link 
              to="/contacts" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block"
            >
              Связаться с нами
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Сертификаты и достижения */}
      <section className="py-16 bg-gradient-to-b from-bg-secondary/30 to-transparent">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-green">
              Сертификаты и достижения
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Наша квалификация подтверждена официальными сертификатами от производителей электромобилей 
              и профессиональных организаций.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  key={item}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-bg-secondary/50 p-6 rounded-lg text-center shadow-md hover:shadow-accent-blue/20 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-accent-blue/20 to-accent-green/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Сертификат #{item}</h3>
                  <p className="text-text-secondary text-sm">
                    Официальный сертификат от производителя электромобилей
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 rounded-xl shadow-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Готовы доверить нам свой электромобиль?</h2>
              <p className="text-text-secondary max-w-3xl mx-auto mb-8">
                Запишитесь на консультацию или диагностику, и наши специалисты помогут поддерживать 
                ваш электромобиль в отличном состоянии.
              </p>
              <Link 
                to="/contacts" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 inline-block"
              >
                Записаться на обслуживание
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Сертификаты и достижения */}
      <section className="py-16 bg-bg-secondary">
        <div className="container">
          <div className="glass-card p-8 md:p-12 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-green/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Сертификаты и достижения</h2>
              <p className="text-text-secondary max-w-3xl mx-auto">
                Наша команда постоянно совершенствуется и подтверждает свою квалификацию.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-4xl font-bold text-accent-blue mb-2">24+</div>
                <p className="text-text-secondary">Сертификатов</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-4xl font-bold text-accent-blue mb-2">12+</div>
                <p className="text-text-secondary">Марок электромобилей</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-4xl font-bold text-accent-blue mb-2">3000+</div>
                <p className="text-text-secondary">Обслуженных авто</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-4xl font-bold text-accent-blue mb-2">5 лет</div>
                <p className="text-text-secondary">На рынке</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                to="/reviews" 
                className="px-6 py-3 rounded-full bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary font-semibold transition-all duration-300 hover:border-accent-blue/80 hover:shadow-neon inline-block"
              >
                Посмотреть отзывы клиентов
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About 
import React from 'react'
import { motion } from 'framer-motion'

const ChargingMap = () => {
  return (
    <section className="py-16 md:py-24 bg-bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Карта зарядных станций
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Найдите ближайшие зарядные станции для вашего электромобиля. Карта обновляется в реальном времени.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-2 md:p-4 rounded-xl overflow-hidden"
        >
          <div className="aspect-video w-full">
            <iframe 
              src="https://iframe.2chargers.net/" 
              title="Карта зарядных станций электромобилей" 
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="mt-4 px-4 pb-4 text-center">
            <p className="text-text-secondary text-sm">
              Для получения дополнительной информации о зарядных станциях, нажмите на маркер на карте.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChargingMap 
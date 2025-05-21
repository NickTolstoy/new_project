import nodemailer from 'nodemailer';

// Конфигурация транспорта для отправки писем
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // true для порта 465
  auth: {
    user: 'nickteamofpro@yandex.ru',
    pass: 'nefgscaladbzzydu',
  },
  tls: {
    // не проверять сертификат
    rejectUnauthorized: false
  },
  debug: true, // показывать debug информацию
  logger: true // логировать все SMTP взаимодействия
});

// Проверка подключения к SMTP серверу
transporter.verify(function(error, success) {
  if (error) {
    console.error('Ошибка SMTP соединения:', error);
  } else {
    console.log('SMTP сервер готов к отправке сообщений');
  }
});

/**
 * Отправляет email с данными из формы контактов
 * @param {Object} formData - Данные из формы контактов
 * @param {string} formData.name - Имя
 * @param {string} formData.phone - Телефон
 * @param {string} formData.email - Email
 * @param {string} formData.carModel - Модель электромобиля
 * @param {string} formData.service - Тип услуги
 * @param {string} formData.message - Сообщение
 * @returns {Promise<boolean>} Promise с результатом отправки
 */
export const sendContactForm = async (formData) => {
  try {
    console.log('Начинаем отправку email с данными:', JSON.stringify(formData, null, 2));
    
    // Название услуги на русском в зависимости от значения
    const serviceMapping = {
      'battery': 'Ремонт батареи',
      'diagnostics': 'Диагностика',
      'software': 'Обновление ПО',
      'engine': 'Ремонт двигателя',
      'charging': 'Обслуживание зарядных станций',
      'other': 'Другое',
      '': 'Не указано'
    };
    
    const serviceName = serviceMapping[formData.service] || formData.service;
    
    // Подготовка email сообщения
    const mailOptions = {
      from: '"Сервис электромобилей" <nickteamofpro@yandex.ru>',
      to: 'nickteamofpro@yandex.ru', // Адрес получателя
      subject: `Новая заявка с сайта: ${formData.name}`,
      html: `
        <h1>Новая заявка с сайта</h1>
        <p><strong>Имя:</strong> ${formData.name}</p>
        <p><strong>Телефон:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email || 'Не указан'}</p>
        <p><strong>Модель электромобиля:</strong> ${formData.carModel || 'Не указана'}</p>
        <p><strong>Интересующая услуга:</strong> ${serviceName}</p>
        <p><strong>Сообщение:</strong><br>${formData.message || 'Отсутствует'}</p>
        <hr>
        <p><em>Заявка отправлена с сайта АвтосервисЛюбань</em></p>
      `
    };

    // Отправка email
    console.log('Отправляем письмо с опциями:', JSON.stringify(mailOptions, null, 2));
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email отправлен успешно:', info.messageId);
    return true;
  } catch (error) {
    console.error('Детальная ошибка при отправке email:', error);
    return false;
  }
};

export default { sendContactForm }; 
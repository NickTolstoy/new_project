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
 * Отправляет письмо электронной почты
 * @param {Object} options Опции для отправки
 * @param {string} options.to Email получателя
 * @param {string} options.subject Тема письма
 * @param {string} options.text Текстовая версия письма
 * @param {string} options.html HTML версия письма
 * @returns {Promise<boolean>} Результат отправки
 */
export async function sendMail(options) {
  try {
    // Добавляем отправителя, если он не указан
    const mailOptions = {
      from: '"Сервис электромобилей" <nickteamofpro@yandex.ru>',
      ...options
    };
    
    // Отправка email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email отправлен успешно:', info.messageId);
    return true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return false;
  }
}

export default { sendMail }; 
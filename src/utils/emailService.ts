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
});

// Интерфейс для данных формы
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  carModel: string;
  service: string;
  message: string;
}

/**
 * Отправляет email с данными из формы контактов
 * @param formData Данные из формы контактов
 * @returns Promise с результатом отправки
 */
export const sendContactForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Название услуги на русском в зависимости от значения
    const serviceMapping: Record<string, string> = {
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
    const info = await transporter.sendMail(mailOptions);
    console.log('Email отправлен:', info.messageId);
    return true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return false;
  }
};

export default { sendContactForm }; 
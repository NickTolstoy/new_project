import { executeQuery } from './db.js';
import { sendMail } from './mailer.js';

/**
 * Сохранение формы обратной связи в базу данных
 * @param {Object} formData Данные формы
 * @returns {Promise<Object>} Результат операции
 */
export async function saveContactForm(formData) {
  try {
    // Проверка наличия обязательных полей
    if (!formData.name || !formData.formType) {
      return {
        success: false,
        message: 'Отсутствуют обязательные поля'
      };
    }

    // Формируем данные для сохранения
    const { name, phone, email, service, message, carModel, formType, rating = null } = formData;
    
    // Устанавливаем тип сервиса в зависимости от типа формы
    let serviceType = service || formType;
    
    // Вставляем запись в таблицу форм обратной связи
    const sql = `
      INSERT INTO contact_forms 
        (name, phone, email, service_type, message, car_model, form_type, rating, created_at, is_processed) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)
    `;
    
    const result = await executeQuery(sql, [
      name,
      phone || '',
      email || '',
      serviceType || '',
      message || '',
      carModel || '',
      formType,
      rating
    ]);
    
    const formId = result.insertId;
    
    console.log(`Форма обратной связи успешно сохранена с ID: ${formId}`);
    
    // Отправляем уведомление на email (если настроено)
    try {
      await sendNotificationEmail(formData);
    } catch (emailError) {
      console.error('Ошибка при отправке уведомления на email:', emailError);
      // Не прерываем выполнение, так как форма уже сохранена
    }
    
    return {
      success: true,
      message: 'Форма успешно сохранена',
      formId
    };
  } catch (error) {
    console.error('Ошибка при сохранении формы обратной связи:', error);
    return {
      success: false,
      message: `Ошибка при сохранении формы: ${error.message}`
    };
  }
}

/**
 * Получение всех форм обратной связи
 * @returns {Promise<Array>} Массив форм
 */
export async function getAllContactForms() {
  try {
    const sql = `
      SELECT 
        form_id as id,
        name,
        phone,
        email,
        service_type as service,
        message,
        car_model as carModel,
        form_type as formType,
        rating,
        is_processed as isProcessed,
        processed_at as processedAt,
        processed_by as processedBy,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as date
      FROM contact_forms
      ORDER BY created_at DESC
    `;
    
    const result = await executeQuery(sql);
    
    // Возвращаем только массив данных, а не объект с success и data
    return result.data || [];
  } catch (error) {
    console.error('Ошибка при получении форм обратной связи:', error);
    return []; // В случае ошибки возвращаем пустой массив
  }
}

/**
 * Получение форм по типу
 * @param {string} formType Тип формы (contact, popup, review)
 * @returns {Promise<Array>} Массив форм
 */
export async function getContactFormsByType(formType) {
  try {
    const sql = `
      SELECT 
        form_id as id,
        name,
        phone,
        email,
        service_type as service,
        message,
        car_model as carModel,
        form_type as formType,
        rating,
        is_processed as isProcessed,
        processed_at as processedAt,
        processed_by as processedBy,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as date
      FROM contact_forms
      WHERE form_type = ?
      ORDER BY created_at DESC
    `;
    
    const result = await executeQuery(sql, [formType]);
    
    // Возвращаем только массив данных, а не объект с success и data
    return result.data || [];
  } catch (error) {
    console.error(`Ошибка при получении форм типа ${formType}:`, error);
    return []; // В случае ошибки возвращаем пустой массив
  }
}

/**
 * Обновление статуса формы
 * @param {number} formId ID формы
 * @param {Object} status Новый статус
 * @returns {Promise<Object>} Результат операции
 */
export async function updateFormStatus(formId, status) {
  try {
    const { isProcessed, processedBy } = status;
    
    // Проверяем, что formId является числом
    if (isNaN(Number(formId))) {
      return {
        success: false,
        message: 'Некорректный ID формы'
      };
    }
    
    // Формируем SQL запрос в зависимости от переданных полей
    let sql = 'UPDATE contact_forms SET ';
    const params = [];
    const updateFields = [];
    
    if (isProcessed !== undefined) {
      updateFields.push('is_processed = ?');
      params.push(isProcessed ? 1 : 0);
      
      // Если форма обработана, устанавливаем время обработки
      if (isProcessed) {
        updateFields.push('processed_at = NOW()');
      }
    }
    
    if (processedBy !== undefined) {
      updateFields.push('processed_by = ?');
      params.push(processedBy);
    }
    
    if (updateFields.length === 0) {
      return {
        success: false,
        message: 'Нет данных для обновления'
      };
    }
    
    sql += updateFields.join(', ');
    sql += ' WHERE form_id = ?';
    params.push(formId);
    
    await executeQuery(sql, params);
    
    return {
      success: true,
      message: 'Статус формы успешно обновлен'
    };
  } catch (error) {
    console.error(`Ошибка при обновлении статуса формы ${formId}:`, error);
    return {
      success: false,
      message: `Ошибка при обновлении статуса: ${error.message}`
    };
  }
}

/**
 * Удаление формы
 * @param {number} formId ID формы
 * @returns {Promise<Object>} Результат операции
 */
export async function deleteContactForm(formId) {
  try {
    // Проверяем, что formId является числом
    if (isNaN(Number(formId))) {
      return {
        success: false,
        message: 'Некорректный ID формы'
      };
    }
    
    const sql = 'DELETE FROM contact_forms WHERE form_id = ?';
    
    await executeQuery(sql, [formId]);
    
    return {
      success: true,
      message: 'Форма успешно удалена'
    };
  } catch (error) {
    console.error(`Ошибка при удалении формы ${formId}:`, error);
    return {
      success: false,
      message: `Ошибка при удалении формы: ${error.message}`
    };
  }
}

/**
 * Отправка уведомления о новой форме на email
 * @param {Object} formData Данные формы
 */
async function sendNotificationEmail(formData) {
  const { name, phone, email, service, message, formType } = formData;
  
  // Формируем тему письма в зависимости от типа формы
  let subject;
  switch (formType) {
    case 'contact':
      subject = 'Новая заявка с формы обратной связи';
      break;
    case 'popup':
      subject = 'Новый запрос обратного звонка';
      break;
    case 'review':
      subject = 'Новый отзыв о сервисе';
      break;
    default:
      subject = 'Новая заявка с сайта';
  }
  
  // Формируем текст письма
  const text = `
    Новая заявка с сайта:
    
    Тип формы: ${formType}
    Имя: ${name}
    Телефон: ${phone || 'Не указан'}
    Email: ${email || 'Не указан'}
    Услуга: ${service || 'Не указана'}
    
    Сообщение:
    ${message || 'Сообщение отсутствует'}
  `;
  
  // Формируем HTML-версию письма
  const html = `
    <h2>Новая заявка с сайта</h2>
    
    <p><strong>Тип формы:</strong> ${formType}</p>
    <p><strong>Имя:</strong> ${name}</p>
    <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
    <p><strong>Email:</strong> ${email || 'Не указан'}</p>
    <p><strong>Услуга:</strong> ${service || 'Не указана'}</p>
    
    <h3>Сообщение:</h3>
    <p>${message || 'Сообщение отсутствует'}</p>
  `;
  
  // Отправляем письмо администратору
  await sendMail({
    to: 'admin@autoservice.com', // Замените на реальный email
    subject,
    text,
    html
  });
} 
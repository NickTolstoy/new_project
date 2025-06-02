import express from 'express';
import { sendContactForm } from '../utils/emailService.js';
import { saveReview, getAllReviews, verifyReview, deleteReview, updateReview } from './reviewsRepository.js';
import { testConnection, executeQuery } from './db.js';
import { 
  saveContactForm, 
  getAllContactForms, 
  getContactFormsByType, 
  updateFormStatus, 
  deleteContactForm 
} from './contactRepository.js';
import {
  saveNewsletterSubscription,
  unsubscribeByToken,
  getAllNewsletterSubscriptions,
  updateSubscriptionStatus,
  deleteSubscription
} from './newsletterRepository.js';

const router = express.Router();

// Проверка подключения к базе данных
router.get('/db-status', async (req, res) => {
  const isConnected = await testConnection();
  res.json({
    connected: isConnected,
    message: isConnected 
      ? 'Подключение к базе данных успешно установлено' 
      : 'Ошибка подключения к базе данных'
  });
});

// Обработчик POST-запроса для отправки данных формы
router.post('/contact', async (req, res) => {
  try {
    console.log('API получил данные формы:', req.body);
    
    const formData = req.body;
    
    // Проверка обязательных полей
    if (!formData.name) {
      console.log('Ошибка валидации: отсутствуют обязательные поля');
      return res.status(400).json({ 
        success: false, 
        message: 'Необходимо указать имя' 
      });
    }
    
    // Сохранение в базу данных
    const dbResult = await saveContactForm(formData);
    
    if (!dbResult.success) {
      console.error('Ошибка при сохранении в БД:', dbResult.message);
      return res.status(500).json({
        success: false,
        message: 'Ошибка при сохранении заявки'
      });
    }
    
    // Отправка email
    try {
      // Пробуем отправить через настроенный транспорт
      const emailSuccess = await sendContactForm(formData);
      
      if (emailSuccess) {
        console.log('Почта успешно отправлена');
      } else {
        console.log('SMTP отправка не удалась, но форма сохранена в БД');
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка успешно отправлена',
        formId: dbResult.formId
      });
    } catch (emailError) {
      console.error('Ошибка в процессе отправки почты:', emailError);
      // Форма сохранена в БД, так что возвращаем успех
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка принята, но возникли проблемы с отправкой уведомления',
        formId: dbResult.formId
      });
    }
  } catch (error) {
    console.error('Общая ошибка обработки запроса:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Внутренняя ошибка сервера' 
    });
  }
});

// Эндпоинт для сохранения отзыва
router.post('/reviews', async (req, res) => {
  try {
    console.log('[API] Получены данные отзыва:', req.body);
    
    const reviewData = req.body;
    
    // Проверка обязательных полей
    if (!reviewData.name || !reviewData.message) {
      console.log('[API] Ошибка валидации: отсутствуют обязательные поля отзыва');
      return res.status(400).json({ 
        success: false, 
        message: 'Необходимо указать имя и текст отзыва' 
      });
    }
    
    // Сохраняем отзыв в базе данных отзывов - эта функция сама создаст запись в contact_forms
    const result = await saveReview(reviewData);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Отзыв успешно сохранен',
        reviewId: result.reviewId
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || 'Ошибка при сохранении отзыва'
      });
    }
  } catch (error) {
    console.error('[API] Ошибка при обработке отзыва:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обработке отзыва'
    });
  }
});

// Получение всех отзывов
router.get('/reviews', async (req, res) => {
  try {
    const result = await getAllReviews();
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        reviews: result.reviews
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || 'Ошибка при получении отзывов',
        reviews: []
      });
    }
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при получении отзывов',
      reviews: []
    });
  }
});

// Получение всех форм обратной связи (для админки)
router.get('/admin/forms', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    // if (!isAdminAuthenticated(req)) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Требуется авторизация'
    //   });
    // }
    
    const forms = await getAllContactForms();
    
    return res.status(200).json({
      success: true,
      forms
    });
  } catch (error) {
    console.error('Ошибка при получении форм обратной связи:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при получении форм',
      forms: []
    });
  }
});

// Получение форм обратной связи определенного типа (для админки)
router.get('/admin/forms/by-type/:type', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { type } = req.params;
    
    if (!['contact', 'popup', 'review'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Некорректный тип формы'
      });
    }
    
    const forms = await getContactFormsByType(type);
    
    return res.status(200).json({
      success: true,
      forms
    });
  } catch (error) {
    console.error(`Ошибка при получении форм типа ${req.params.type}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при получении форм',
      forms: []
    });
  }
});

// Обновление статуса формы (для админки)
router.patch('/admin/forms/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    const status = req.body;
    
    console.log(`[API] Обновление статуса формы с ID ${id}:`, status);
    
    // Получаем тип формы, чтобы проверить, является ли она отзывом
    const forms = await getAllContactForms();
    const form = forms.find(f => f.id == id);
    
    if (!form) {
      console.error(`[API] Ошибка: форма с ID ${id} не найдена`);
      return res.status(404).json({
        success: false,
        message: 'Форма не найдена'
      });
    }
    
    console.log(`[API] Найдена форма:`, form);
    
    const result = await updateFormStatus(id, status);
    
    if (result.success) {
      // Если форма является отзывом и отмечена как обработанная, 
      // также создаем и верифицируем отзыв в таблице reviews, если его там еще нет
      if (form && form.formType === 'review' && status.isProcessed) {
        try {
          console.log(`[API] Форма с ID ${id} является отзывом и отмечена как обработанная.`);
          
          // Сначала проверяем, есть ли отзыв с таким же ID
          const checkIdSql = `SELECT review_id FROM reviews WHERE review_id = ?`;
          const checkIdResult = await executeQuery(checkIdSql, [id]);
          
          if (checkIdResult.success && checkIdResult.data.length > 0) {
            // Отзыв с таким ID уже существует, верифицируем его
            console.log(`[API] Найден отзыв с таким же ID ${id}. Верифицируем его...`);
            await verifyReview(id);
            console.log(`[API] Отзыв с ID ${id} успешно верифицирован.`);
          } else {
            // Ищем соответствующий отзыв по имени, email и дате
            const checkReviewSql = `
              SELECT review_id 
              FROM reviews 
              WHERE author_name = ? 
                AND (author_email = ? OR (author_email IS NULL AND ? IS NULL))
                AND DATE(created_at) = DATE(?)
            `;
            
            const reviewDate = new Date(form.date);
            const formattedDate = reviewDate.toISOString().split('T')[0]; // формат YYYY-MM-DD
            
            console.log(`[API] Проверяем наличие отзыва для формы: имя=${form.name}, email=${form.email}, дата=${formattedDate}`);
            
            const checkResult = await executeQuery(checkReviewSql, [
              form.name,
              form.email,
              form.email,
              formattedDate
            ]);
            
            if (checkResult.success && checkResult.data.length > 0) {
              // Отзыв уже существует, просто верифицируем его
              const reviewId = checkResult.data[0].review_id;
              console.log(`[API] Найден существующий отзыв с ID ${reviewId}. Верифицируем его...`);
              
              await verifyReview(reviewId);
              console.log(`[API] Отзыв с ID ${reviewId} успешно верифицирован.`);
            } else {
              // Отзыв не существует, создаем его
              console.log(`[API] Отзыв не найден. Создаем новый отзыв из формы с ID ${id}`);
              
              // Создаем SQL для вставки отзыва
              const createReviewSql = `
                INSERT INTO reviews 
                  (review_id, rating, review_text, car_model, service_name, author_name, author_email, author_phone, created_at, is_verified, is_published) 
                VALUES 
                  (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)
              `;
              
              const createParams = [
                parseInt(id, 10),  // Используем тот же ID что и у формы
                form.rating || 5,
                form.message || '',
                form.carModel || '',
                form.service || '',
                form.name || 'Анонимный пользователь',
                form.email || null,
                form.phone || null,
                form.date || new Date().toISOString()
              ];
              
              console.log(`[API] Создаем отзыв с параметрами:`, createParams);
              
              const createResult = await executeQuery(createReviewSql, createParams);
              
              if (createResult.success) {
                console.log(`[API] Отзыв успешно создан с ID ${id} и уже верифицирован.`);
              } else {
                console.error(`[API] Ошибка при создании отзыва:`, createResult.error);
              }
            }
          }
        } catch (verifyError) {
          console.error(`[API] Ошибка при верификации отзыва для формы ${id}:`, verifyError);
          // Продолжаем выполнение, так как основная операция обновления статуса прошла успешно
        }
      }
      
      return res.status(200).json({
        success: true,
        message: 'Статус формы успешно обновлен'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(`[API] Ошибка при обновлении статуса формы ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обновлении статуса формы'
    });
  }
});

// Верификация отзыва (для админки)
router.patch('/admin/reviews/:id/verify', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    
    const result = await verifyReview(id);
    
    if (result.success) {
      // Также обновим статус соответствующей формы если она есть
      try {
        // Проверяем, есть ли соответствующая форма в contact_forms
        const forms = await getAllContactForms();
        const matchingForm = forms.find(f => f.id == id);
        
        // Если напрямую не найдена форма по ID, попробуем найти связанную форму
        if (!matchingForm) {
          // Получаем данные об отзыве из базы данных
          const sql = `
            SELECT 
              author_name, 
              author_email, 
              DATE(created_at) as created_date 
            FROM reviews 
            WHERE review_id = ?
          `;
          
          const reviewResult = await executeQuery(sql, [id]);
          
          if (reviewResult.success && reviewResult.data.length > 0) {
            const reviewData = reviewResult.data[0];
            
            // Ищем соответствующую форму по имени, email и дате
            const matchingFormSql = `
              SELECT form_id 
              FROM contact_forms 
              WHERE name = ? 
                AND (email = ? OR (email IS NULL AND ? IS NULL))
                AND DATE(created_at) = ?
            `;
            
            const matchingFormResult = await executeQuery(matchingFormSql, [
              reviewData.author_name,
              reviewData.author_email,
              reviewData.author_email,
              reviewData.created_date
            ]);
            
            if (matchingFormResult.success && matchingFormResult.data.length > 0) {
              const formId = matchingFormResult.data[0].form_id;
              
              // Обновляем статус найденной формы
              await updateFormStatus(formId, { 
                isProcessed: true,
                processedBy: 'admin-review-verify'
              });
              
              console.log(`Найдена и обновлена связанная форма с ID ${formId} для отзыва с ID ${id}`);
            }
          }
        } else {
          // Обновляем статус формы, найденной по ID
          await updateFormStatus(id, { 
            isProcessed: true,
            processedBy: 'admin-review-verify'
          });
        }
      } catch (formError) {
        console.error(`Предупреждение: Не удалось обновить статус формы для отзыва ${id}:`, formError);
        // Не прерываем выполнение, так как основная операция верификации прошла успешно
      }
      
      return res.status(200).json({
        success: true,
        message: 'Отзыв успешно верифицирован'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(`Ошибка при верификации отзыва ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при верификации отзыва'
    });
  }
});

// Обновление полей отзыва (для админки)
router.patch('/admin/reviews/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    const { carModel, service } = req.body;
    
    // Проверка на наличие данных для обновления
    if (!carModel && !service) {
      return res.status(400).json({
        success: false,
        message: 'Необходимо указать хотя бы один параметр для обновления'
      });
    }
    
    const result = await updateReview(id, { carModel, service });
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Отзыв успешно обновлен'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(`Ошибка при обновлении отзыва ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обновлении отзыва'
    });
  }
});

// Удаление отзыва (для админки)
router.delete('/admin/reviews/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    console.log(`[API] Получен запрос на удаление отзыва с ID: ${id}`);
    
    // Сначала получим информацию об отзыве для логов
    try {
      const reviewInfoSql = `
        SELECT 
          review_id,
          author_name,
          DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
          review_text,
          is_verified
        FROM reviews
        WHERE review_id = ?
      `;
      
      const reviewInfo = await executeQuery(reviewInfoSql, [id]);
      
      if (reviewInfo.success && reviewInfo.data && reviewInfo.data.length > 0) {
        const review = reviewInfo.data[0];
        console.log(`[API] Удаляемый отзыв с ID ${id}:`, review);
      } else {
        console.log(`[API] Отзыв с ID ${id} не найден в базе данных`);
      }
    } catch (infoError) {
      console.error(`[API] Ошибка при получении информации об отзыве ${id}:`, infoError);
      // Продолжаем удаление даже если не смогли получить информацию об отзыве
    }
    
    // Вызываем функцию удаления отзыва
    const result = await deleteReview(id);
    console.log(`[API] Результат удаления отзыва с ID ${id}:`, result);
    
    if (result.success) {
      // Также ищем и удаляем соответствующую запись из contact_forms,
      // если она существует и не была удалена из репозитория
      try {
        const formSql = `SELECT form_id FROM contact_forms WHERE form_id = ? AND form_type = 'review'`;
        const formResult = await executeQuery(formSql, [id]);
        
        if (formResult.success && formResult.data && formResult.data.length > 0) {
          console.log(`[API] Найдена соответствующая форма с ID ${id}, удаляем её...`);
          
          const deleteFormSql = `DELETE FROM contact_forms WHERE form_id = ? AND form_type = 'review'`;
          const deleteResult = await executeQuery(deleteFormSql, [id]);
          
          if (deleteResult.success) {
            console.log(`[API] Форма с ID ${id} успешно удалена из contact_forms`);
          } else {
            console.error(`[API] Ошибка при удалении формы с ID ${id}:`, deleteResult.error);
          }
        } else {
          console.log(`[API] Соответствующая форма с ID ${id} не найдена в contact_forms`);
        }
      } catch (formError) {
        console.error(`[API] Ошибка при обработке соответствующей формы для отзыва ${id}:`, formError);
        // Продолжаем выполнение, так как основная операция удаления отзыва прошла успешно
      }
      
      return res.status(200).json({
        success: true,
        message: 'Отзыв успешно удален'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(`[API] Ошибка при удалении отзыва ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при удалении отзыва'
    });
  }
});

// Удаление формы (для админки)
router.delete('/admin/forms/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    
    // Сначала проверим, является ли форма отзывом
    const forms = await getAllContactForms();
    const form = forms.find(f => f.id == id);
    
    const isReview = form && form.formType === 'review';
    
    // Если это отзыв, удаляем его из таблицы reviews
    if (isReview) {
      console.log(`Форма с ID ${id} является отзывом. Удаляем соответствующую запись из таблицы reviews`);
      
      try {
        // Получаем связанные отзывы по email, имени и дате создания
        const sql = `
          SELECT r.review_id 
          FROM reviews r
          JOIN contact_forms cf ON r.author_name = cf.name 
            AND (r.author_email = cf.email OR (r.author_email IS NULL AND cf.email IS NULL))
            AND DATE(r.created_at) = DATE(cf.created_at)
          WHERE cf.form_id = ?
        `;
        
        const reviewResult = await executeQuery(sql, [id]);
        
        if (reviewResult.success && reviewResult.data.length > 0) {
          const reviewId = reviewResult.data[0].review_id;
          console.log(`Найден связанный отзыв с ID ${reviewId}. Удаляем его...`);
          
          // Вызываем функцию удаления отзыва с найденным ID
          await deleteReview(reviewId);
          console.log(`Отзыв с ID ${reviewId} успешно удален из таблицы reviews`);
        } else {
          // Если связанный отзыв не найден, пробуем удалить по тому же ID
          console.log(`Связанный отзыв не найден. Пробуем удалить отзыв с тем же ID ${id}`);
          await deleteReview(id);
        }
      } catch (reviewError) {
        console.error(`Предупреждение: Ошибка при удалении из reviews`, reviewError);
        // Продолжаем выполнение, так как основная операция удаления формы еще не выполнена
      }
    } else {
      console.log(`Форма с ID ${id} не является отзывом, удаляем только из таблицы contact_forms`);
    }
    
    // Удаляем запись из таблицы contact_forms
    const result = await deleteContactForm(id);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Форма успешно удалена'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(`Ошибка при удалении формы ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при удалении формы'
    });
  }
});

// Простая авторизация администратора (не используйте так в продакшене)
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Простая проверка учетных данных (НЕБЕЗОПАСНО! В продакшене используйте нормальную аутентификацию)
  if (username === 'admin' && password === 'admin123') {
    // В реальном приложении здесь должна быть нормальная авторизация с токенами
    return res.status(200).json({
      success: true,
      token: 'fake-jwt-token', // В реальном приложении здесь должен быть настоящий JWT
      message: 'Авторизация успешна'
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Неверное имя пользователя или пароль'
    });
  }
});

// Подписка на новости
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    console.log('[API] Получены данные подписки на новости:', req.body);
    
    const newsletterData = req.body;
    
    // Проверка обязательных полей
    if (!newsletterData.email) {
      console.log('[API] Ошибка валидации: отсутствует email');
      return res.status(400).json({ 
        success: false, 
        message: 'Необходимо указать email для подписки' 
      });
    }
    
    // Сохранение подписки
    const result = await saveNewsletterSubscription(newsletterData);
    
    if (result.success) {
      // TODO: Отправка подтверждения на email (в будущем)
      
      return res.status(200).json({
        success: true,
        message: result.message,
        formId: result.formId
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('[API] Ошибка при обработке подписки:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обработке подписки'
    });
  }
});

// Отписка от новостей
router.post('/newsletter/unsubscribe', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Отсутствует токен отписки'
      });
    }
    
    const result = await unsubscribeByToken(token);
    
    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      message: result.message
    });
  } catch (error) {
    console.error('[API] Ошибка при отписке от новостей:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при отписке от новостей'
    });
  }
});

// Получение всех подписок на новости
router.get('/newsletter/subscriptions', async (req, res) => {
  try {
    console.log('[API] Запрос на получение всех подписок на новости');
    
    const result = await getAllNewsletterSubscriptions();
    
    if (result.success) {
      console.log(`[API] Успешно получены ${result.data.length} подписок`);
      return res.json({
        success: true,
        subscriptions: result.data, // Используем subscriptions вместо data для совместимости
        data: result.data // Оставляем и data для совместимости
      });
    } else {
      console.error(`[API] Ошибка при получении подписок: ${result.message}`);
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('[API] Ошибка при обработке запроса на получение подписок:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при получении подписок'
    });
  }
});

// Обновление статуса подписки (для админки)
router.patch('/admin/newsletter/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    const status = req.body;
    
    if (typeof status.isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Необходимо указать статус подписки (isActive)'
      });
    }
    
    const result = await updateSubscriptionStatus(id, status);
    
    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      message: result.message
    });
  } catch (error) {
    console.error(`[API] Ошибка при обновлении статуса подписки ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обновлении статуса подписки'
    });
  }
});

// Удаление подписки (для админки)
router.delete('/admin/newsletter/:id', async (req, res) => {
  try {
    // TODO: Добавить проверку аутентификации администратора
    
    const { id } = req.params;
    
    const result = await deleteSubscription(id);
    
    return res.status(result.success ? 200 : 400).json({
      success: result.success,
      message: result.message
    });
  } catch (error) {
    console.error(`[API] Ошибка при удалении подписки ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при удалении подписки'
    });
  }
});

// Удаление подписки на новости
router.delete('/newsletter/subscriptions/:id', async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    console.log(`[API] Запрос на удаление подписки с ID ${subscriptionId}`);
    
    const result = await deleteSubscription(subscriptionId);
    
    if (result.success) {
      console.log(`[API] Успешно удалена подписка с ID ${subscriptionId}`);
      return res.json({
        success: true,
        message: 'Подписка успешно удалена'
      });
    } else {
      console.error(`[API] Ошибка при удалении подписки: ${result.message}`);
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('[API] Ошибка при обработке запроса на удаление подписки:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при удалении подписки'
    });
  }
});

// Обновление статуса подписки
router.patch('/newsletter/subscriptions/:id', async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updateData = req.body;
    console.log(`[API] Запрос на обновление подписки с ID ${subscriptionId}:`, updateData);
    
    const result = await updateSubscriptionStatus(subscriptionId, updateData);
    
    if (result.success) {
      console.log(`[API] Успешно обновлен статус подписки с ID ${subscriptionId}`);
      return res.json({
        success: true,
        message: 'Статус подписки успешно обновлен'
      });
    } else {
      console.error(`[API] Ошибка при обновлении подписки: ${result.message}`);
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('[API] Ошибка при обработке запроса на обновление подписки:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при обновлении подписки'
    });
  }
});

export default router; 
import { executeQuery } from './db.js';

// Функция для сохранения отзыва в базу данных
async function saveReview(reviewData) {
  try {
    const { 
      name, 
      message,
      rating,
      service, 
      carModel,
      email = null,
      phone = null
    } = reviewData;
    
    const sql = `
      INSERT INTO reviews 
        (rating, review_text, car_model, service_name, author_name, author_email, author_phone, created_at, is_verified) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    const params = [
      rating || 5,
      message || '',
      carModel || '',
      service || '',
      name || 'Анонимный пользователь',
      email,
      phone,
      false // новые отзывы не верифицированы
    ];
    
    const result = await executeQuery(sql, params);
    
    if (result.success) {
      // Если отзыв успешно сохранен, также сохраняем запись в таблице contact_forms
      // чтобы сохранить совместимость с существующей логикой
      await saveContactForm({
        formType: 'review',
        name,
        email,
        phone,
        carModel,
        service,
        message,
        rating
      });
      
      return { 
        success: true, 
        reviewId: result.data.insertId,
        message: 'Отзыв успешно сохранен'
      };
    } else {
      throw new Error(result.error || 'Ошибка при сохранении отзыва');
    }
  } catch (error) {
    console.error('Ошибка при сохранении отзыва:', error);
    return {
      success: false,
      message: error.message || 'Ошибка при сохранении отзыва'
    };
  }
}

// Функция для сохранения формы в таблицу contact_forms
async function saveContactForm(formData) {
  try {
    console.log(`[SERVER] Попытка сохранения формы отзыва в contact_forms`);
    
    const {
      formType,
      name,
      email,
      phone,
      carModel,
      service,
      message,
      rating
    } = formData;
    
    const sql = `
      INSERT INTO contact_forms 
        (name, phone, email, service_type, message, car_model, form_type, rating, created_at, is_processed) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)
    `;
    
    const params = [
      name || '',
      phone || '',
      email || '',
      service || '',
      message || '',
      carModel || '',
      'review', // для отзывов всегда "review"
      rating || 5
    ];
    
    console.log(`[SERVER] SQL-запрос для сохранения формы:`, sql);
    console.log(`[SERVER] Параметры для сохранения формы:`, params);
    
    const result = await executeQuery(sql, params);
    
    if (result.success) {
      console.log(`[SERVER] Форма отзыва успешно сохранена в contact_forms с ID: ${result.data.insertId}`);
    } else {
      console.error(`[SERVER] Ошибка при сохранении формы в contact_forms:`, result.error);
    }
    
    return result.success ? {
      success: true,
      formId: result.data.insertId
    } : {
      success: false,
      message: result.error
    };
  } catch (error) {
    console.error('[SERVER] Ошибка при сохранении формы (отзыва):', error);
    return {
      success: false,
      message: error.message || 'Ошибка при сохранении формы'
    };
  }
}

// Получение ID типа формы по названию
async function getFormTypeId(typeName) {
  const result = await executeQuery('SELECT form_type_id FROM form_types WHERE name = ?', [typeName]);
  
  if (result.success && result.data.length > 0) {
    return result.data[0].form_type_id;
  }
  
  // По умолчанию - тип "review" (3)
  return 3;
}

// Функция для получения всех отзывов
async function getAllReviews() {
  try {
    const sql = `
      SELECT 
        review_id as id,
        author_name as author,
        rating,
        DATE_FORMAT(created_at, '%Y-%m-%d') as date,
        review_text as text,
        car_model as car,
        service_name as service,
        is_verified as verified
      FROM 
        reviews
      WHERE 
        is_published = true
      ORDER BY 
        created_at DESC
    `;
    
    console.log('[REVIEWS_REPO] Запрос для получения всех отзывов (включая неверифицированные)');
    const result = await executeQuery(sql);
    
    if (result.success) {
      console.log(`[REVIEWS_REPO] Получено отзывов: ${result.data.length}`);
      // Правильно преобразуем is_verified в Boolean для фронтенда
      result.data.forEach(review => {
        console.log(`[REVIEWS_REPO] ID:${review.id}, Верификация:${review.verified}, Автор:${review.author}`);
        // Преобразуем verified из числа в boolean
        review.verified = Boolean(review.verified);
      });
    }
    
    return result.success ? {
      success: true,
      reviews: result.data
    } : {
      success: false,
      message: result.error,
      reviews: []
    };
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    return {
      success: false,
      message: error.message || 'Ошибка при получении отзывов',
      reviews: []
    };
  }
}

// Функция для верификации отзыва
async function verifyReview(reviewId) {
  try {
    // Проверяем, что id является числом
    if (isNaN(Number(reviewId))) {
      return {
        success: false,
        message: 'Некорректный ID отзыва'
      };
    }

    // Обновляем статус верификации отзыва
    const sql = `
      UPDATE reviews 
      SET is_verified = 1 
      WHERE review_id = ?
    `;
    
    const result = await executeQuery(sql, [reviewId]);
    
    if (result.success) {
      console.log(`Отзыв с ID ${reviewId} успешно верифицирован`);
      return {
        success: true,
        message: 'Отзыв успешно верифицирован'
      };
    } else {
      throw new Error(result.error || 'Ошибка при верификации отзыва');
    }
  } catch (error) {
    console.error(`Ошибка при верификации отзыва ${reviewId}:`, error);
    return {
      success: false,
      message: error.message || 'Ошибка при верификации отзыва'
    };
  }
}

// Функция для удаления отзыва
async function deleteReview(reviewId) {
  try {
    console.log(`[SERVER] Запрос на удаление отзыва с ID ${reviewId}`);
    
    // Проверяем, что id является числом
    if (isNaN(Number(reviewId))) {
      console.error(`[SERVER] Некорректный ID отзыва: ${reviewId}`);
      return {
        success: false,
        message: 'Некорректный ID отзыва'
      };
    }

    // Получаем данные отзыва перед удалением (для логов)
    const getReviewSql = `
      SELECT 
        review_id,
        author_name, 
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_date, 
        review_text 
      FROM reviews 
      WHERE review_id = ?
    `;
    
    const reviewData = await executeQuery(getReviewSql, [reviewId]);
    
    if (reviewData.success && reviewData.data.length > 0) {
      const review = reviewData.data[0];
      console.log(`[SERVER] Удаляемый отзыв: ID=${review.review_id}, автор=${review.author_name}, дата=${review.created_date}, текст=${review.review_text.substring(0, 30)}...`);
    } else {
      console.log(`[SERVER] Отзыв с ID ${reviewId} не найден в базе`);
      return {
        success: false,
        message: `Отзыв с ID ${reviewId} не найден`
      };
    }

    // Удаляем отзыв из таблицы reviews
    const sql = `
      DELETE FROM reviews 
      WHERE review_id = ?
    `;
    
    const result = await executeQuery(sql, [reviewId]);
    
    if (result.success) {
      // Проверяем, действительно ли отзыв удален
      const verifyDeleteSql = `SELECT COUNT(*) as count FROM reviews WHERE review_id = ?`;
      const verifyResult = await executeQuery(verifyDeleteSql, [reviewId]);
      
      if (verifyResult.success && verifyResult.data[0].count === 0) {
        console.log(`[SERVER] Отзыв с ID ${reviewId} успешно удален из таблицы reviews (проверено)`);
      } else {
        console.error(`[SERVER] ОШИБКА: Отзыв с ID ${reviewId} не был удален из базы данных`);
        return {
          success: false,
          message: 'Отзыв не был удален из базы данных'
        };
      }
      
      // Проверяем, есть ли соответствующая запись в contact_forms
      console.log(`[SERVER] Проверяем наличие соответствующей формы в contact_forms...`);
      
      const checkFormSql = `
        SELECT form_id 
        FROM contact_forms 
        WHERE form_id = ? AND form_type = 'review'
      `;
      
      const formData = await executeQuery(checkFormSql, [reviewId]);
      
      if (formData.success && formData.data.length > 0) {
        console.log(`[SERVER] Найдена соответствующая форма с ID ${reviewId}, удаляем её...`);
        
        const deleteFormSql = `
          DELETE FROM contact_forms 
          WHERE form_id = ? AND form_type = 'review'
        `;
        
        const formDeleteResult = await executeQuery(deleteFormSql, [reviewId]);
        
        if (formDeleteResult.success) {
          console.log(`[SERVER] Форма с ID ${reviewId} успешно удалена из таблицы contact_forms`);
        } else {
          console.warn(`[SERVER] Не удалось удалить форму с ID ${reviewId}: ${formDeleteResult.error}`);
        }
      } else {
        console.log(`[SERVER] Соответствующая форма с ID ${reviewId} не найдена`);
      }
      
      return {
        success: true,
        message: 'Отзыв успешно удален'
      };
    } else {
      throw new Error(result.error || 'Ошибка при удалении отзыва');
    }
  } catch (error) {
    console.error(`[SERVER] Ошибка при удалении отзыва ${reviewId}:`, error);
    return {
      success: false,
      message: error.message || 'Ошибка при удалении отзыва'
    };
  }
}

// Функция для обновления полей отзыва (car_model и service_name)
async function updateReview(reviewId, updateData) {
  try {
    // Проверяем, что id является числом
    if (isNaN(Number(reviewId))) {
      return {
        success: false,
        message: 'Некорректный ID отзыва'
      };
    }

    const { carModel, service } = updateData;
    
    // Формируем SQL запрос
    const sql = `
      UPDATE reviews 
      SET car_model = ?, service_name = ? 
      WHERE review_id = ?
    `;
    
    const result = await executeQuery(sql, [
      carModel || '',
      service || '',
      reviewId
    ]);
    
    if (result.success) {
      console.log(`Отзыв с ID ${reviewId} успешно обновлен`);
      
      // Обновляем также соответствующую запись в contact_forms, если такая существует
      try {
        const updateFormSql = `
          UPDATE contact_forms 
          SET car_model = ?, service_type = ? 
          WHERE form_id = ? AND form_type = 'review'
        `;
        
        await executeQuery(updateFormSql, [carModel || '', service || '', reviewId]);
      } catch (formError) {
        console.warn(`Предупреждение: не удалось обновить форму для отзыва ${reviewId}:`, formError);
        // Продолжаем выполнение, так как основная операция обновления отзыва прошла успешно
      }
      
      return {
        success: true,
        message: 'Отзыв успешно обновлен'
      };
    } else {
      throw new Error(result.error || 'Ошибка при обновлении отзыва');
    }
  } catch (error) {
    console.error(`Ошибка при обновлении отзыва ${reviewId}:`, error);
    return {
      success: false,
      message: error.message || 'Ошибка при обновлении отзыва'
    };
  }
}

export { saveReview, getAllReviews, verifyReview, deleteReview, updateReview }; 
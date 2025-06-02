import { executeQuery } from './db.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Сохранение новой подписки на новости
 * @param {Object} newsletterData Данные подписки
 * @returns {Object} Результат операции
 */
export async function saveNewsletterSubscription(newsletterData) {
  try {
    // Проверяем, существует ли уже подписка с таким email
    const checkSql = 'SELECT * FROM newsletter_subscriptions WHERE email = ?';
    const checkResult = await executeQuery(checkSql, [newsletterData.email]);
    
    if (checkResult.success && checkResult.data.length > 0) {
      // Подписка уже существует, проверяем статус
      const existingSubscription = checkResult.data[0];
      
      if (existingSubscription.is_active) {
        return {
          success: false,
          message: 'Этот email уже подписан на нашу рассылку.',
          formId: existingSubscription.subscription_id
        };
      } else {
        // Подписка существует, но неактивна - активируем ее
        const updateSql = 'UPDATE newsletter_subscriptions SET is_active = 1, updated_at = NOW() WHERE subscription_id = ?';
        await executeQuery(updateSql, [existingSubscription.subscription_id]);
        
        return {
          success: true,
          message: 'Ваша подписка успешно восстановлена.',
          formId: existingSubscription.subscription_id
        };
      }
    }
    
    // Генерируем уникальный токен для отписки
    const unsubscribeToken = uuidv4();
    
    // Создаем новую подписку
    const sql = `
      INSERT INTO newsletter_subscriptions (
        email, 
        name, 
        unsubscribe_token, 
        created_at, 
        is_active
      ) VALUES (?, ?, ?, NOW(), 1)
    `;
    
    const params = [
      newsletterData.email,
      newsletterData.name || null,
      unsubscribeToken
    ];
    
    const result = await executeQuery(sql, params);
    
    if (result.success) {
      return {
        success: true,
        message: 'Подписка успешно оформлена.',
        formId: result.insertId,
        unsubscribeToken
      };
    } else {
      console.error('Ошибка при сохранении подписки:', result.error);
      return {
        success: false,
        message: 'Произошла ошибка при оформлении подписки.'
      };
    }
  } catch (error) {
    console.error('Ошибка при сохранении подписки на новости:', error);
    return {
      success: false,
      message: 'Произошла ошибка при оформлении подписки.'
    };
  }
}

/**
 * Отписка по токену
 * @param {string} token Токен для отписки
 * @returns {Object} Результат операции
 */
export async function unsubscribeByToken(token) {
  try {
    // Проверяем существование подписки с указанным токеном
    const checkSql = 'SELECT * FROM newsletter_subscriptions WHERE unsubscribe_token = ?';
    const checkResult = await executeQuery(checkSql, [token]);
    
    if (!checkResult.success || checkResult.data.length === 0) {
      return {
        success: false,
        message: 'Недействительный токен отписки.'
      };
    }
    
    // Обновляем статус подписки
    const updateSql = 'UPDATE newsletter_subscriptions SET is_active = 0, updated_at = NOW() WHERE unsubscribe_token = ?';
    const result = await executeQuery(updateSql, [token]);
    
    if (result.success) {
      return {
        success: true,
        message: 'Вы успешно отписались от рассылки.'
      };
    } else {
      return {
        success: false,
        message: 'Произошла ошибка при отписке от рассылки.'
      };
    }
  } catch (error) {
    console.error('Ошибка при отписке от рассылки:', error);
    return {
      success: false,
      message: 'Произошла ошибка при отписке от рассылки.'
    };
  }
}

/**
 * Получение всех подписок на новости
 * @returns {Promise<Object>} Результат операции
 */
export async function getAllNewsletterSubscriptions() {
  try {
    console.log('[REPO] Начинаем получение всех подписок на новости');
    
    const sql = 'SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC';
    const result = await executeQuery(sql);
    
    if (result.success) {
      // Преобразуем данные в нужный формат
      const subscriptions = result.data.map(item => ({
        id: item.subscription_id,
        email: item.email,
        name: item.name || null,
        date: item.created_at,
        isActive: !!item.is_active,
        unsubscribeToken: item.unsubscribe_token,
        formType: 'newsletter'
      }));
      
      console.log(`[REPO] Успешно получено ${subscriptions.length} подписок`);
      
      return {
        success: true,
        data: subscriptions
      };
    } else {
      console.error(`[REPO] Ошибка при выполнении запроса: ${result.error}`);
      return {
        success: false,
        message: 'Ошибка при получении списка подписок',
        error: result.error
      };
    }
  } catch (error) {
    console.error('[REPO] Произошла ошибка при получении подписок:', error);
    return {
      success: false,
      message: 'Произошла ошибка при получении подписок',
      error: error.message
    };
  }
}

/**
 * Обновление статуса подписки
 * @param {number|string} id ID подписки
 * @param {Object} status Новый статус
 * @returns {Object} Результат операции
 */
export async function updateSubscriptionStatus(id, status) {
  try {
    const sql = 'UPDATE newsletter_subscriptions SET is_active = ?, updated_at = NOW() WHERE subscription_id = ?';
    const params = [status.isActive ? 1 : 0, id];
    
    const result = await executeQuery(sql, params);
    
    if (result.success) {
      return {
        success: true,
        message: 'Статус подписки успешно обновлен'
      };
    } else {
      return {
        success: false,
        message: 'Ошибка при обновлении статуса подписки'
      };
    }
  } catch (error) {
    console.error('Ошибка при обновлении статуса подписки:', error);
    return {
      success: false,
      message: 'Произошла ошибка при обновлении статуса подписки'
    };
  }
}

/**
 * Удаление подписки
 * @param {number|string} id ID подписки
 * @returns {Object} Результат операции
 */
export async function deleteSubscription(id) {
  try {
    const sql = 'DELETE FROM newsletter_subscriptions WHERE subscription_id = ?';
    const result = await executeQuery(sql, [id]);
    
    if (result.success) {
      return {
        success: true,
        message: 'Подписка успешно удалена'
      };
    } else {
      return {
        success: false,
        message: 'Ошибка при удалении подписки'
      };
    }
  } catch (error) {
    console.error('Ошибка при удалении подписки:', error);
    return {
      success: false,
      message: 'Произошла ошибка при удалении подписки'
    };
  }
} 
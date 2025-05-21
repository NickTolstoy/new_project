/**
 * Сервис для работы с отзывами через API
 */

// Базовый URL API (в зависимости от окружения)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Отправка отзыва на сервер
 * @param {Object} reviewData Данные отзыва
 * @returns {Promise<Object>} Результат отправки
 */
export async function submitReview(reviewData) {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();
    
    // Если API вернул ошибку
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при отправке отзыва');
    }
    
    return data;
  } catch (error) {
    console.error('Ошибка в процессе отправки отзыва:', error);
    
    // В случае сетевой ошибки или проблем с API, сохраняем в localStorage
    // это позволяет сохранить функциональность офлайн
    try {
      const savedFormsJSON = localStorage.getItem('contactForms');
      let savedForms = [];
      
      if (savedFormsJSON) {
        savedForms = JSON.parse(savedFormsJSON);
        if (!Array.isArray(savedForms)) {
          savedForms = [];
        }
      }
      
      // Добавляем отзыв в localStorage
      const localReview = {
        ...reviewData,
        id: `review-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        date: new Date().toISOString(),
        formType: 'review'
      };
      
      const forms = [...savedForms, localReview];
      localStorage.setItem('contactForms', JSON.stringify(forms));
      
      // Отправляем событие для обновления интерфейса
      window.dispatchEvent(new CustomEvent('reviewAdded', { 
        detail: { formId: localReview.id, fallback: true }
      }));
      
      return {
        success: true,
        message: 'Отзыв сохранен локально (офлайн-режим)',
        isOffline: true
      };
    } catch (localError) {
      console.error('Ошибка при сохранении отзыва в localStorage:', localError);
      throw error; // Пробрасываем оригинальную ошибку
    }
  }
}

/**
 * Получение всех отзывов с сервера
 * @returns {Promise<Array>} Массив отзывов
 */
export async function getReviews() {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    // Если API вернул ошибку
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при получении отзывов');
    }
    
    return data.reviews || [];
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    
    // В случае сетевой ошибки или проблем с API, используем данные из localStorage
    // и примеры отзывов
    return [];
  }
}

/**
 * Проверка статуса подключения к базе данных
 * @returns {Promise<Boolean>} Статус подключения
 */
export async function checkDatabaseConnection() {
  try {
    const response = await fetch(`${API_URL}/db-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.connected || false;
  } catch (error) {
    console.error('Ошибка при проверке подключения к БД:', error);
    return false;
  }
} 
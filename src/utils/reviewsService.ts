import { ReviewData, ReviewSubmitResult, ReviewItem } from './reviewsService.d';

// URL API
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Отправка отзыва на сервер
 * @param reviewData Данные отзыва
 */
export async function submitReview(reviewData: ReviewData): Promise<ReviewSubmitResult> {
  try {
    // Проверяем подключение к сети
    if (!navigator.onLine) {
      console.log('Нет подключения к интернету. Сохраняем отзыв локально.');
      
      // Сохраняем отзыв локально
      saveReviewLocally(reviewData);
      
      return {
        success: true,
        message: 'Отзыв сохранен локально. Он будет отправлен, когда появится подключение к интернету.',
        isOffline: true
      };
    }
    
    // Отправляем отзыв на сервер
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Отзыв успешно отправлен на сервер:', result);
      return {
        success: true,
        message: 'Спасибо за ваш отзыв! Он успешно отправлен.',
        reviewId: result.reviewId
      };
    } else {
      console.error('Ошибка при отправке отзыва:', result.message);
      
      // В случае ошибки также сохраняем локально
      saveReviewLocally(reviewData);
      
      return {
        success: false,
        message: result.message || 'Ошибка при отправке отзыва. Попробуйте позже.'
      };
    }
  } catch (error) {
    console.error('Произошла ошибка при отправке отзыва:', error);
    
    // В случае ошибки сохраняем локально
    saveReviewLocally(reviewData);
    
    return {
      success: false,
      message: 'Произошла ошибка при отправке отзыва. Попробуйте позже.'
    };
  }
}

/**
 * Получение всех отзывов с сервера
 */
export async function getReviews(): Promise<ReviewItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const data = await response.json();
    
    if (data.success && Array.isArray(data.reviews)) {
      console.log('[REVIEWS SERVICE] Получены отзывы с сервера:', data.reviews);
      
      // Все отзывы с сервера уже верифицированы (is_verified = 1)
      const processedReviews = data.reviews.map((review: any) => {
        console.log(`[REVIEWS SERVICE] Обработка отзыва ID ${review.id}, верификация:`, review.verified, typeof review.verified);
        
        // Более надежное преобразование числового verified в boolean
        let isVerified = false;
        
        // Проверяем все возможные варианты значения verified
        if (review.verified === 1 || review.verified === true || review.verified === '1' || review.verified === 'true') {
          isVerified = true;
        }
        
        console.log(`[REVIEWS SERVICE] Отзыв ID ${review.id}, преобразованное значение verified:`, isVerified);
        
        return {
          ...review,
          verified: isVerified // Явно устанавливаем boolean значение
        };
      });
      
      console.log('[REVIEWS SERVICE] Обработанные отзывы:', processedReviews);
      return processedReviews;
    } else {
      console.error('[REVIEWS SERVICE] Ошибка получения отзывов:', data.message || 'Неизвестная ошибка');
      return [];
    }
  } catch (error) {
    console.error('[REVIEWS SERVICE] Произошла ошибка при получении отзывов:', error);
    return [];
  }
}

/**
 * Проверка статуса подключения к базе данных
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/db-status`);
    const data = await response.json();
    
    return data.connected === true;
  } catch (error) {
    console.error('Ошибка при проверке подключения к базе данных:', error);
    return false;
  }
}

/**
 * Сохранение отзыва локально
 */
function saveReviewLocally(reviewData: ReviewData): void {
  try {
    // Получаем существующие отзывы
    let localReviews = [];
    const storedReviews = localStorage.getItem('localReviews');
    
    if (storedReviews) {
      localReviews = JSON.parse(storedReviews);
      
      if (!Array.isArray(localReviews)) {
        localReviews = [];
      }
    }
    
    // Добавляем новый отзыв
    localReviews.push({
      ...reviewData,
      savedAt: new Date().toISOString(),
      synced: false
    });
    
    // Сохраняем отзывы в localStorage
    localStorage.setItem('localReviews', JSON.stringify(localReviews));
    
    console.log('Отзыв сохранен локально');
  } catch (error) {
    console.error('Ошибка при сохранении отзыва локально:', error);
  }
}

/**
 * Верификация отзыва администратором
 * @param reviewId ID отзыва
 */
export async function verifyReview(reviewId: number | string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Отзыв успешно верифицирован:', reviewId);
      return true;
    } else {
      console.error('Ошибка при верификации отзыва:', data.message);
      return false;
    }
  } catch (error) {
    console.error('Произошла ошибка при верификации отзыва:', error);
    return false;
  }
}

/**
 * Обновление отзыва администратором
 * @param reviewId ID отзыва
 * @param updateData Данные для обновления (carModel, service)
 */
export async function updateReview(reviewId: number | string, updateData: { carModel?: string, service?: string }): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Отзыв успешно обновлен:', reviewId);
      return true;
    } else {
      console.error('Ошибка при обновлении отзыва:', data.message);
      return false;
    }
  } catch (error) {
    console.error('Произошла ошибка при обновлении отзыва:', error);
    return false;
  }
}

/**
 * Удаление отзыва администратором 
 * @param reviewId ID отзыва
 */
export async function deleteReview(reviewId: number | string): Promise<boolean> {
  try {
    console.log(`[DELETE REVIEW] Отправка запроса на удаление отзыва с ID ${reviewId}...`);
    const url = `${API_BASE_URL}/admin/reviews/${reviewId}`;
    console.log(`[DELETE REVIEW] URL запроса: ${url}`);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`[DELETE REVIEW] Получен ответ со статусом: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[DELETE REVIEW] Ошибка HTTP: ${response.status} ${response.statusText}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`[DELETE REVIEW] Ответ API:`, data);
    
    if (data.success) {
      console.log(`[DELETE REVIEW] Отзыв успешно удален: ${reviewId}`);
      return true;
    } else {
      console.error(`[DELETE REVIEW] Ошибка при удалении отзыва: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error(`[DELETE REVIEW] Произошла ошибка при удалении отзыва:`, error);
    return false;
  }
} 
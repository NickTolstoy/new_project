import { executeQuery } from './src/server/db.js';

async function createVerifiedReview() {
  console.log('[СОЗДАНИЕ] Начинаем создание верифицированного тестового отзыва...');
  
  try {
    // Сначала удалим существующие отзывы
    await executeQuery('DELETE FROM reviews');
    console.log('[СОЗДАНИЕ] Удалены существующие отзывы');
    
    const sql = `
      INSERT INTO reviews 
        (rating, review_text, car_model, service_name, author_name, author_email, author_phone, created_at, is_verified, is_published) 
      VALUES 
        (5, 'Отличный сервис! Очень доволен обслуживанием и скоростью работы.', 'Tesla Model Y', 'Диагностика батареи', 'Алексей Тестовый', 'test@example.com', '+79001234567', NOW(), 1, 1)
    `;
    
    const result = await executeQuery(sql);
    
    if (result.success) {
      const reviewId = result.data.insertId;
      console.log(`[СОЗДАНИЕ] Успешно создан верифицированный тестовый отзыв с ID ${reviewId}`);
      
      // Получаем данные созданного отзыва
      const getReviewSql = `SELECT * FROM reviews WHERE review_id = ?`;
      const reviewData = await executeQuery(getReviewSql, [reviewId]);
      
      if (reviewData.success && reviewData.data.length > 0) {
        console.log('[СОЗДАНИЕ] Данные созданного отзыва:', reviewData.data[0]);
        
        // Дополнительная проверка верификации
        console.log('[СОЗДАНИЕ] Статус верификации:', reviewData.data[0].is_verified === 1 ? 'Верифицирован' : 'Не верифицирован');
      }
      
      // Проверяем API отзывов
      console.log('[СОЗДАНИЕ] Проверка отображения в API...');
      
      return reviewId;
    } else {
      console.error('[СОЗДАНИЕ] Ошибка при создании отзыва:', result.error);
    }
  } catch (error) {
    console.error('[СОЗДАНИЕ] Произошла ошибка:', error);
  } finally {
    console.log('[СОЗДАНИЕ] Завершено. Теперь проверьте страницу отзывов: http://localhost:8000/reviews');
    process.exit(0);
  }
}

createVerifiedReview(); 
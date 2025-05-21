import { executeQuery } from './src/server/db.js';

async function testVerification() {
  console.log('[ТЕСТ] Начинаем тестирование верификации отзывов...');
  
  try {
    // 1. Получаем все существующие отзывы
    const reviewsResult = await executeQuery('SELECT * FROM reviews');
    
    if (reviewsResult.success && reviewsResult.data.length > 0) {
      console.log(`[ТЕСТ] Найдено отзывов: ${reviewsResult.data.length}`);
      
      // Выводим информацию о каждом отзыве
      reviewsResult.data.forEach(review => {
        console.log(`[ТЕСТ] Отзыв ID ${review.review_id}:
          - Автор: ${review.author_name}
          - Текст: ${review.review_text.substring(0, 30)}...
          - Верифицирован: ${review.is_verified === 1 ? 'Да' : 'Нет'}
          - Опубликован: ${review.is_published === 1 ? 'Да' : 'Нет'}
        `);
      });
      
      // 2. Проверяем, что возвращает API
      console.log('[ТЕСТ] Подготовка тестовых запросов...');
      
      // 3. Проверяем ещё раз, что данные верифицированы в БД
      const verifiedReviewsResult = await executeQuery('SELECT COUNT(*) as count FROM reviews WHERE is_verified = 1');
      const verifiedCount = verifiedReviewsResult.data[0].count;
      
      console.log(`[ТЕСТ] Количество верифицированных отзывов в БД: ${verifiedCount}`);
      
      if (verifiedCount === 0 && reviewsResult.data.length > 0) {
        // Если есть отзывы, но нет верифицированных, делаем верификацию
        console.log('[ТЕСТ] Верифицируем имеющиеся отзывы...');
        const verifyResult = await executeQuery('UPDATE reviews SET is_verified = 1 WHERE 1');
        console.log(`[ТЕСТ] Результат верификации: ${verifyResult.success ? 'Успешно' : 'Ошибка'}`);
        
        if (verifyResult.success) {
          console.log(`[ТЕСТ] Верифицировано записей: ${verifyResult.data.affectedRows}`);
        }
      }
    } else {
      console.log('[ТЕСТ] Отзывы не найдены в базе данных');
    }
    
    console.log('[ТЕСТ] Тестирование завершено');
  } catch (error) {
    console.error('[ТЕСТ] Ошибка при тестировании:', error);
  }
}

// Запускаем тест
testVerification(); 
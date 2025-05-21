import { executeQuery } from './src/server/db.js';

async function testReviewsDisplay() {
  console.log('[ТЕСТ] Начинаем тестирование отображения отзывов...');
  
  try {
    // 1. Проверяем существование верифицированных отзывов
    console.log('[ТЕСТ] Проверяем наличие верифицированных отзывов в базе данных...');
    const checkResult = await executeQuery('SELECT * FROM reviews WHERE is_verified = 1');
    
    if (checkResult.success && checkResult.data.length > 0) {
      console.log(`[ТЕСТ] Найдены верифицированные отзывы (${checkResult.data.length}):`);
      checkResult.data.forEach(review => {
        console.log(`[ТЕСТ] Отзыв ID: ${review.review_id}, Автор: ${review.author_name}, Верифицирован: ${review.is_verified === 1 ? 'Да' : 'Нет'}`);
      });
    } else {
      console.log('[ТЕСТ] Верифицированные отзывы не найдены в базе данных');
    }
    
    // 2. Проверяем запрос SQL из getAllReviews
    console.log('[ТЕСТ] Проверяем SQL-запрос из getAllReviews...');
    const testSql = `
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
        AND is_verified = 1
      ORDER BY 
        created_at DESC
    `;
    
    const sqlResult = await executeQuery(testSql);
    
    if (sqlResult.success && sqlResult.data.length > 0) {
      console.log(`[ТЕСТ] SQL-запрос вернул ${sqlResult.data.length} отзывов:`);
      sqlResult.data.forEach(review => {
        console.log(`[ТЕСТ] Отзыв ID: ${review.id}, Автор: ${review.author}, Верифицирован: ${review.verified}`);
      });
    } else {
      console.log('[ТЕСТ] SQL-запрос не вернул отзывов. Проверьте условия фильтрации.');
    }
    
    console.log('[ТЕСТ] Тестирование завершено.');
    console.log('[ТЕСТ] После обновления кода, перезапустите сервер:');
    console.log('[ТЕСТ] 1. Остановите текущий сервер (Ctrl+C)');
    console.log('[ТЕСТ] 2. Перезапустите его: node server.js');
    console.log('[ТЕСТ] 3. Откройте http://localhost:8000/reviews в режиме инкогнито');
    
  } catch (error) {
    console.error('[ТЕСТ] Произошла ошибка:', error);
  } finally {
    process.exit(0);
  }
}

testReviewsDisplay(); 
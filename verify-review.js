import { executeQuery } from './src/server/db.js';

async function verifyReviewTest() {
  try {
    console.log('[ТЕСТ] Тестирование верификации отзыва');
    
    // 1. Сначала получим все неверифицированные отзывы
    const nonVerifiedSql = `SELECT * FROM reviews WHERE is_verified = 0`;
    const nonVerifiedResult = await executeQuery(nonVerifiedSql);
    
    if (!nonVerifiedResult.success || nonVerifiedResult.data.length === 0) {
      console.log('[ТЕСТ] Неверифицированные отзывы не найдены. Тест остановлен.');
      return;
    }
    
    // Берем первый неверифицированный отзыв
    const review = nonVerifiedResult.data[0];
    console.log('[ТЕСТ] Найден неверифицированный отзыв:', {
      id: review.review_id,
      author: review.author_name,
      text: review.review_text.substring(0, 50) + (review.review_text.length > 50 ? '...' : ''),
      isVerified: review.is_verified === 1
    });
    
    // 2. Верифицируем отзыв
    console.log(`[ТЕСТ] Верификация отзыва с ID ${review.review_id}...`);
    const verifySql = `UPDATE reviews SET is_verified = 1 WHERE review_id = ?`;
    const verifyResult = await executeQuery(verifySql, [review.review_id]);
    
    if (verifyResult.success) {
      console.log(`[ТЕСТ] Отзыв с ID ${review.review_id} успешно верифицирован`);
      
      // 3. Проверяем, что отзыв теперь отображается в API
      console.log('[ТЕСТ] Проверка отображения отзыва в API...');
      
      // Получаем отзыв из БД для проверки
      const checkSql = `SELECT * FROM reviews WHERE review_id = ?`;
      const checkResult = await executeQuery(checkSql, [review.review_id]);
      
      if (checkResult.success && checkResult.data.length > 0) {
        const updatedReview = checkResult.data[0];
        console.log('[ТЕСТ] Статус отзыва после верификации:', {
          id: updatedReview.review_id,
          author: updatedReview.author_name,
          isVerified: updatedReview.is_verified === 1,
          isPublished: updatedReview.is_published === 1
        });
      }
      
      // 4. Получаем количество верифицированных отзывов
      const countSql = `SELECT COUNT(*) as count FROM reviews WHERE is_verified = 1`;
      const countResult = await executeQuery(countSql);
      
      if (countResult.success) {
        console.log(`[ТЕСТ] Количество верифицированных отзывов: ${countResult.data[0].count}`);
      }
    } else {
      console.error('[ТЕСТ] Ошибка при верификации отзыва:', verifyResult.error);
    }
  } catch (error) {
    console.error('[ТЕСТ] Ошибка при выполнении теста:', error);
  }
}

verifyReviewTest(); 
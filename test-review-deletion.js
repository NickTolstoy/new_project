import { executeQuery } from './src/server/db.js';

async function testReviewDeletion() {
  console.log('[ТЕСТ] Начинаем тестирование удаления отзыва...');
  
  try {
    // 1. Проверяем существование отзыва с ID 1
    console.log('[ТЕСТ] Проверяем существование отзыва с ID 1...');
    const checkResult = await executeQuery('SELECT * FROM reviews WHERE review_id = 1');
    
    if (checkResult.success && checkResult.data.length > 0) {
      const review = checkResult.data[0];
      console.log('[ТЕСТ] Найден отзыв с ID 1:', {
        author: review.author_name,
        text: review.review_text,
        isVerified: review.is_verified,
        isPublished: review.is_published
      });
    } else {
      console.log('[ТЕСТ] Отзыв с ID 1 не найден в базе данных');
    }
    
    // 2. Выполняем прямое удаление из базы данных
    console.log('[ТЕСТ] Выполняем прямое удаление отзыва с ID 1...');
    const deleteResult = await executeQuery('DELETE FROM reviews WHERE review_id = 1');
    
    if (deleteResult.success) {
      console.log(`[ТЕСТ] Результат удаления: затронуто ${deleteResult.data.affectedRows} строк`);
    } else {
      console.error('[ТЕСТ] Ошибка при удалении:', deleteResult.error);
    }
    
    // 3. Проверяем, действительно ли отзыв удален
    console.log('[ТЕСТ] Проверяем, удален ли отзыв...');
    const verifyResult = await executeQuery('SELECT COUNT(*) as count FROM reviews WHERE review_id = 1');
    
    if (verifyResult.success) {
      const count = verifyResult.data[0].count;
      if (count === 0) {
        console.log('[ТЕСТ] Отзыв успешно удален!');
      } else {
        console.error('[ТЕСТ] ОШИБКА: Отзыв все еще существует в базе данных!');
      }
    } else {
      console.error('[ТЕСТ] Ошибка при проверке:', verifyResult.error);
    }
    
  } catch (error) {
    console.error('[ТЕСТ] Произошла ошибка:', error);
  } finally {
    process.exit(0);
  }
}

testReviewDeletion(); 
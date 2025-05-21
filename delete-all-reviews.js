import { executeQuery } from './src/server/db.js';

async function deleteAllReviews() {
  console.log('[УДАЛЕНИЕ] Начинаем процесс удаления всех отзывов из базы данных...');
  
  try {
    // 1. Удаляем из таблицы reviews
    console.log('[УДАЛЕНИЕ] Удаляем все отзывы из таблицы reviews...');
    const reviewsResult = await executeQuery('DELETE FROM reviews');
    
    if (reviewsResult.success) {
      console.log(`[УДАЛЕНИЕ] Успешно удалено из таблицы reviews: ${reviewsResult.data.affectedRows} записей`);
    } else {
      console.error('[УДАЛЕНИЕ] Ошибка при удалении из таблицы reviews:', reviewsResult.error);
    }
    
    // 2. Удаляем отзывы из таблицы contact_forms
    console.log('[УДАЛЕНИЕ] Удаляем все отзывы из таблицы contact_forms...');
    const formsResult = await executeQuery("DELETE FROM contact_forms WHERE form_type = 'review'");
    
    if (formsResult.success) {
      console.log(`[УДАЛЕНИЕ] Успешно удалено из таблицы contact_forms: ${formsResult.data.affectedRows} записей`);
    } else {
      console.error('[УДАЛЕНИЕ] Ошибка при удалении из таблицы contact_forms:', formsResult.error);
    }
    
    // 3. Сброс автоинкремента для таблицы reviews
    console.log('[УДАЛЕНИЕ] Сбрасываем автоинкремент для таблицы reviews...');
    const resetAutoIncrementResult = await executeQuery('ALTER TABLE reviews AUTO_INCREMENT = 1');
    
    if (resetAutoIncrementResult.success) {
      console.log('[УДАЛЕНИЕ] Автоинкремент для таблицы reviews успешно сброшен');
    } else {
      console.error('[УДАЛЕНИЕ] Ошибка при сбросе автоинкремента:', resetAutoIncrementResult.error);
    }
    
    console.log('[УДАЛЕНИЕ] Процесс удаления всех отзывов завершен успешно');
  } catch (error) {
    console.error('[УДАЛЕНИЕ] Произошла ошибка при удалении отзывов:', error);
  }
}

// Запускаем функцию удаления
deleteAllReviews(); 
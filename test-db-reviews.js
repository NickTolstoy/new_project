import { executeQuery } from './src/server/db.js';

async function checkReviews() {
  try {
    console.log('Проверка всех отзывов в базе данных:');
    
    const reviewsSql = `
      SELECT 
        review_id as id, 
        author_name as author, 
        is_verified, 
        is_published,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM reviews
    `;
    
    const reviewsResult = await executeQuery(reviewsSql);
    
    if (reviewsResult.success) {
      console.log('Найдено отзывов:', reviewsResult.data.length);
      reviewsResult.data.forEach(review => {
        console.log(`ID: ${review.id}, Автор: ${review.author}, Верифицирован: ${review.is_verified ? 'Да' : 'Нет'}, Опубликован: ${review.is_published ? 'Да' : 'Нет'}, Создан: ${review.created_at}`);
      });
    } else {
      console.error('Ошибка при получении отзывов:', reviewsResult.error);
    }
    
    // Проверка таблицы форм для сравнения
    console.log('\nПроверка форм отзывов:');
    
    const formsSql = `
      SELECT 
        form_id as id, 
        name as author, 
        is_processed,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM contact_forms
      WHERE form_type = 'review'
    `;
    
    const formsResult = await executeQuery(formsSql);
    
    if (formsResult.success) {
      console.log('Найдено форм отзывов:', formsResult.data.length);
      formsResult.data.forEach(form => {
        console.log(`ID: ${form.id}, Автор: ${form.author}, Обработан: ${form.is_processed ? 'Да' : 'Нет'}, Создан: ${form.created_at}`);
      });
    } else {
      console.error('Ошибка при получении форм:', formsResult.error);
    }
  } catch (error) {
    console.error('Общая ошибка:', error);
  }
}

checkReviews(); 
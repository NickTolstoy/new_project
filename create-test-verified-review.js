import { executeQuery } from './src/server/db.js';

// Функция для создания тестового верифицированного отзыва
async function createTestVerifiedReview() {
  try {
    console.log('Создание тестового верифицированного отзыва...');
    
    // Вставляем тестовый отзыв в таблицу reviews
    const reviewSql = `
      INSERT INTO reviews 
        (author_name, rating, review_text, car_model, service_name, created_at, is_verified, is_published) 
      VALUES 
        (?, ?, ?, ?, ?, NOW(), ?, ?)
    `;
    
    const reviewParams = [
      'Верифицированный Клиент',
      5,
      'Отличное обслуживание! Этот отзыв должен отображаться на странице отзывов, так как он верифицирован.',
      'BMW i4',
      'Замена масляного фильтра',
      1, // Верифицирован
      1  // Опубликован
    ];
    
    const reviewResult = await executeQuery(reviewSql, reviewParams);
    
    if (reviewResult.success) {
      const reviewId = reviewResult.data.insertId;
      console.log(`✅ Тестовый верифицированный отзыв создан с ID: ${reviewId}`);
      
      // Также создаем форму для отзыва
      const formSql = `
        INSERT INTO contact_forms 
          (name, phone, email, service_type, message, car_model, form_type, rating, created_at, is_processed) 
        VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
      `;
      
      const formParams = [
        'Верифицированный Клиент',
        '+7 (999) 765-43-21',
        'verified@example.com',
        'Замена масляного фильтра',
        'Отличное обслуживание! Этот отзыв должен отображаться на странице отзывов, так как он верифицирован.',
        'BMW i4',
        'review',
        5,
        1 // Обработана
      ];
      
      const formResult = await executeQuery(formSql, formParams);
      
      if (formResult.success) {
        console.log(`✅ Форма для верифицированного отзыва создана с ID: ${formResult.data.insertId}`);
      } else {
        console.error('❌ Ошибка при создании формы:', formResult.error);
      }
      
      console.log('\nПроверьте, что этот отзыв ОТОБРАЖАЕТСЯ на странице отзывов:');
      console.log('1. Перейдите на http://localhost:5173/reviews');
      console.log('2. Отзыв от "Верифицированный Клиент" должен быть виден');
      console.log('3. Отзыв от "Тестовый Пользователь" не должен быть виден');
      
      // Проверяем наличие отзыва в API
      console.log('\nПроверка API на наличие отзыва:');
      const checkSql = `
        SELECT 
          review_id as id, 
          author_name as author, 
          is_verified, 
          is_published 
        FROM reviews 
        WHERE author_name = 'Верифицированный Клиент'
      `;
      
      const checkResult = await executeQuery(checkSql);
      
      if (checkResult.success && checkResult.data.length > 0) {
        console.log('✅ Отзыв найден в базе данных:');
        console.log(checkResult.data[0]);
      } else {
        console.error('❌ Отзыв не найден в базе данных или ошибка при проверке');
      }
    } else {
      console.error('❌ Ошибка при создании отзыва:', reviewResult.error);
    }
  } catch (error) {
    console.error('❌ Общая ошибка при выполнении скрипта:', error);
  } finally {
    process.exit(0);
  }
}

createTestVerifiedReview(); 
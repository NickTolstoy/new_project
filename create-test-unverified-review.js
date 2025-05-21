import { executeQuery } from './src/server/db.js';

// Функция для создания тестового неверифицированного отзыва
async function createTestUnverifiedReview() {
  try {
    console.log('Создание тестового неверифицированного отзыва...');
    
    // Вставляем тестовый отзыв в таблицу reviews
    const reviewSql = `
      INSERT INTO reviews 
        (author_name, rating, review_text, car_model, service_name, created_at, is_verified, is_published) 
      VALUES 
        (?, ?, ?, ?, ?, NOW(), ?, ?)
    `;
    
    const reviewParams = [
      'Тестовый Пользователь',
      4,
      'Этот отзыв не должен отображаться на странице отзывов, так как он не верифицирован.',
      'Tesla Model Y',
      'Компьютерная диагностика',
      0, // Не верифицирован
      1  // Но опубликован
    ];
    
    const reviewResult = await executeQuery(reviewSql, reviewParams);
    
    if (reviewResult.success) {
      const reviewId = reviewResult.data.insertId;
      console.log(`✅ Тестовый неверифицированный отзыв создан с ID: ${reviewId}`);
      
      // Также создаем форму для отзыва
      const formSql = `
        INSERT INTO contact_forms 
          (name, phone, email, service_type, message, car_model, form_type, rating, created_at, is_processed) 
        VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
      `;
      
      const formParams = [
        'Тестовый Пользователь',
        '+7 (999) 123-45-67',
        'test@example.com',
        'Компьютерная диагностика',
        'Этот отзыв не должен отображаться на странице отзывов, так как он не верифицирован.',
        'Tesla Model Y',
        'review',
        4,
        0 // Не обработана
      ];
      
      const formResult = await executeQuery(formSql, formParams);
      
      if (formResult.success) {
        console.log(`✅ Форма для неверифицированного отзыва создана с ID: ${formResult.data.insertId}`);
      } else {
        console.error('❌ Ошибка при создании формы:', formResult.error);
      }
      
      console.log('\nПроверьте, что этот отзыв НЕ отображается на странице отзывов:');
      console.log('1. Перейдите на http://localhost:5173/reviews');
      console.log('2. Отзыв от "Тестовый Пользователь" не должен быть виден');
      console.log('3. Но при этом он должен быть в API: http://localhost:5173/api/reviews');
      
      // Проверяем наличие отзыва в API
      console.log('\nПроверка API на наличие отзыва:');
      const checkSql = `
        SELECT 
          review_id as id, 
          author_name as author, 
          is_verified, 
          is_published 
        FROM reviews 
        WHERE author_name = 'Тестовый Пользователь'
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

createTestUnverifiedReview(); 
import fetch from 'node-fetch';

async function testVisibleReviews() {
  try {
    console.log('=== Проверка видимых отзывов на странице ===');
    
    // Получаем данные с API
    console.log('\n1. Получение всех отзывов из API:');
    const response = await fetch('http://localhost:5173/api/reviews');
    const apiData = await response.json();
    
    console.log(`Всего отзывов в API: ${apiData.reviews.length}`);
    
    console.log('\nРаспределение отзывов по статусу верификации:');
    const verifiedReviews = apiData.reviews.filter(review => review.verified === true);
    const unverifiedReviews = apiData.reviews.filter(review => review.verified === false);
    
    console.log(`- Верифицированных отзывов: ${verifiedReviews.length}`);
    console.log(`- Неверифицированных отзывов: ${unverifiedReviews.length}`);
    
    console.log('\n2. Эмуляция логики фильтрации компонента Reviews.tsx:');
    console.log('Отзывы, которые должны отображаться на странице (только верифицированные):');
    
    if (verifiedReviews.length === 0) {
      console.log('❌ НЕТ верифицированных отзывов для отображения');
    } else {
      verifiedReviews.forEach(review => {
        console.log(`✅ ID: ${review.id}, Автор: ${review.author}, Верифицирован: ${review.verified}, Услуга: ${review.service}`);
      });
    }
    
    console.log('\nОтзывы, которые НЕ должны отображаться на странице (неверифицированные):');
    
    if (unverifiedReviews.length === 0) {
      console.log('✓ Нет неверифицированных отзывов (все отображаются)');
    } else {
      unverifiedReviews.forEach(review => {
        console.log(`❌ ID: ${review.id}, Автор: ${review.author}, Верифицирован: ${review.verified}, Услуга: ${review.service}`);
      });
    }
    
    console.log('\n=== Тест завершен ===');
    console.log('Перейдите на страницу http://localhost:5173/reviews и убедитесь,');
    console.log('что отображаются ТОЛЬКО верифицированные отзывы (отмеченные ✅ выше).');
  } catch (error) {
    console.error('Ошибка при выполнении теста:', error);
  }
}

testVisibleReviews(); 
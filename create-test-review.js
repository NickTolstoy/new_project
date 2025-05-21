import fetch from 'node-fetch';

async function createTestReview() {
  try {
    console.log('[ТЕСТ] Создание тестового отзыва');
    
    const reviewData = {
      name: 'Тестовый Пользователь',
      email: 'test@example.com',
      phone: '+79001234567',
      service: 'Техническое обслуживание',
      carModel: 'Tesla Model S',
      message: 'Отличный сервис! Всем рекомендую.',
      rating: 5
    };
    
    const response = await fetch('http://localhost:8000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    const result = await response.json();
    
    console.log('[ТЕСТ] Статус ответа:', response.status);
    console.log('[ТЕСТ] Результат создания отзыва:', result);
    
    if (result.success) {
      console.log('[ТЕСТ] Отзыв успешно создан с ID:', result.reviewId);
      
      // Проверяем, что отзыв действительно создан в базе данных
      console.log('[ТЕСТ] Проверка наличия отзыва в базе данных...');
      
      // Получаем отзывы через API
      const reviewsResponse = await fetch('http://localhost:8000/api/reviews');
      const reviewsResult = await reviewsResponse.json();
      
      if (reviewsResult.success) {
        console.log('[ТЕСТ] Получено отзывов:', reviewsResult.reviews.length);
        
        if (reviewsResult.reviews.length > 0) {
          console.log('[ТЕСТ] Последний отзыв:', reviewsResult.reviews[0]);
        } else {
          console.log('[ТЕСТ] Отзывы не найдены (возможно, не верифицированы)');
        }
      }
      
      // Получаем контактные формы через API
      console.log('[ТЕСТ] Проверка наличия формы в таблице контактов...');
      const formsResponse = await fetch('http://localhost:8000/api/admin/forms');
      const formsResult = await formsResponse.json();
      
      if (formsResult.success) {
        console.log('[ТЕСТ] Получено форм:', formsResult.forms.length);
        
        // Фильтруем только отзывы
        const reviewForms = formsResult.forms.filter(form => form.formType === 'review');
        console.log('[ТЕСТ] Количество форм с типом "отзыв":', reviewForms.length);
        
        if (reviewForms.length > 0) {
          console.log('[ТЕСТ] Последняя форма отзыва:', reviewForms[0]);
        }
      }
    } else {
      console.error('[ТЕСТ] Ошибка при создании отзыва:', result.message);
    }
  } catch (error) {
    console.error('[ТЕСТ] Ошибка при выполнении теста:', error);
  }
}

createTestReview(); 
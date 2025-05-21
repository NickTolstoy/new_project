// ESM синтаксис для работы с fetch
import fetch from 'node-fetch';

async function debugAPIResponse() {
  try {
    console.log('[ОТЛАДКА] Запрос к API http://localhost:8000/api/reviews...');
    
    const response = await fetch('http://localhost:8000/api/reviews');
    const data = await response.json();
    
    console.log('[ОТЛАДКА] Ответ API (статус):', response.status);
    console.log('[ОТЛАДКА] Ответ API (успех):', data.success);
    console.log('[ОТЛАДКА] Количество отзывов:', data.reviews?.length || 0);
    
    if (data.reviews && data.reviews.length > 0) {
      console.log('[ОТЛАДКА] Первый отзыв:');
      console.log(JSON.stringify(data.reviews[0], null, 2));
      
      // Проверяем свойство verified
      const firstReview = data.reviews[0];
      console.log('[ОТЛАДКА] Свойство verified:', firstReview.verified);
      console.log('[ОТЛАДКА] Тип verified:', typeof firstReview.verified);
    }
  } catch (error) {
    console.error('[ОТЛАДКА] Ошибка при получении данных:', error);
  }
}

debugAPIResponse(); 
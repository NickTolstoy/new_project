import fetch from 'node-fetch';

async function checkFrontendAPI() {
  try {
    // Проверка API на порту 8000
    console.log('Проверка API на порту 8000:');
    const response8000 = await fetch('http://localhost:8000/api/reviews');
    const data8000 = await response8000.json();
    
    console.log('Статус ответа:', response8000.status);
    console.log('Количество отзывов:', data8000.reviews?.length || 0);
    console.log('Данные отзывов:');
    console.log(JSON.stringify(data8000.reviews, null, 2));

    try {
      // Проверка API на порту 5173
      console.log('\nПроверка API на порту 5173:');
      const response5173 = await fetch('http://localhost:5173/api/reviews');
      const data5173 = await response5173.json();
      
      console.log('Статус ответа:', response5173.status);
      console.log('Количество отзывов:', data5173.reviews?.length || 0);
      console.log('Данные отзывов:');
      console.log(JSON.stringify(data5173.reviews, null, 2));
    } catch (error5173) {
      console.error('Ошибка при проверке порта 5173:', error5173.message);
    }
  } catch (error) {
    console.error('Общая ошибка:', error);
  }
}

checkFrontendAPI(); 
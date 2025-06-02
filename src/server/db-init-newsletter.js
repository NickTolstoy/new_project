import { executeQuery } from './db.js';

/**
 * Инициализация таблицы newsletter_subscriptions
 */
async function initNewsletterTable() {
  try {
    console.log('Начинаем инициализацию таблицы newsletter_subscriptions...');
    
    // Создаем таблицу, если она не существует
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        subscription_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        unsubscribe_token VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        UNIQUE KEY unique_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    const result = await executeQuery(createTableSQL);
    
    if (result.success) {
      console.log('Таблица newsletter_subscriptions успешно создана или уже существует.');
      return true;
    } else {
      console.error('Ошибка при создании таблицы newsletter_subscriptions:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Произошла ошибка при инициализации таблицы newsletter_subscriptions:', error);
    return false;
  }
}

// Выполняем инициализацию при импорте модуля
initNewsletterTable().then(success => {
  if (success) {
    console.log('Инициализация таблицы newsletter_subscriptions завершена успешно.');
  } else {
    console.error('Не удалось инициализировать таблицу newsletter_subscriptions.');
  }
});

export default initNewsletterTable; 
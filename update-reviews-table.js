/**
 * Скрипт для обновления таблицы reviews
 * Добавляет поля author_email и author_phone
 */

import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'autoservice_db'
};

async function updateReviewsTable() {
  let connection;

  try {
    console.log('Подключение к базе данных...');
    connection = await mysql.createConnection(config);
    console.log('Подключено успешно');

    // Проверка существования полей
    console.log('Проверка существования полей в таблице reviews...');
    const [columns] = await connection.query(`SHOW COLUMNS FROM reviews LIKE 'author_email'`);
    
    if (columns.length === 0) {
      console.log('Добавление новых полей в таблицу reviews...');
      
      // Добавляем поля author_email и author_phone
      await connection.query(`
        ALTER TABLE reviews 
        ADD COLUMN author_email VARCHAR(255) AFTER author_name,
        ADD COLUMN author_phone VARCHAR(20) AFTER author_email
      `);
      
      console.log('Таблица reviews успешно обновлена!');
    } else {
      console.log('Поля уже существуют в таблице reviews');
    }
    
  } catch (error) {
    console.error('Ошибка при обновлении таблицы:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Соединение с базой данных закрыто');
    }
  }
}

updateReviewsTable(); 
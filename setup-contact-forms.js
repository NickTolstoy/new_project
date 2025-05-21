/**
 * Скрипт для создания таблицы contact_forms
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация MySQL
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function setupContactFormsTable() {
  console.log('Создание таблицы contact_forms...');
  let connection;

  try {
    // Подключение к MySQL
    console.log('Подключение к MySQL...');
    connection = await mysql.createConnection(config);
    console.log('Подключено к MySQL!');

    // Создаем SQL для таблицы contact_forms
    const sql = `
      USE autoservice_db;
      
      DROP TABLE IF EXISTS contact_forms;
      
      CREATE TABLE contact_forms (
        form_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(255),
        service_type VARCHAR(100),
        message TEXT,
        car_model VARCHAR(100),
        form_type ENUM('contact', 'popup', 'review') NOT NULL,
        rating INT,
        is_processed BOOLEAN DEFAULT FALSE,
        processed_at TIMESTAMP NULL,
        processed_by VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    // Выполнение SQL-запроса
    console.log('Выполнение SQL-запроса...');
    await connection.query(sql);
    console.log('Таблица contact_forms успешно создана!');

  } catch (error) {
    console.error('Ошибка при создании таблицы contact_forms:', error);
  } finally {
    // Закрытие соединения
    if (connection) {
      await connection.end();
      console.log('Соединение с MySQL закрыто');
    }
  }
}

// Запуск процесса создания таблицы
setupContactFormsTable(); 
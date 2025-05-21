import mysql from 'mysql2/promise';

// Конфигурация подключения к базе данных
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'autoservice_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Создаем пул соединений
let pool;

try {
  pool = mysql.createPool(dbConfig);
  console.log('Пул соединений с базой данных создан успешно');
} catch (error) {
  console.error('Ошибка при создании пула соединений с базой данных:', error);
}

// Функция для проверки соединения
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Соединение с базой данных установлено успешно');
    connection.release();
    return true;
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    return false;
  }
}

// Функция для выполнения SQL-запросов
async function executeQuery(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return { success: true, data: results };
  } catch (error) {
    console.error('Ошибка при выполнении SQL-запроса:', error);
    return { success: false, error: error.message };
  }
}

export { pool, testConnection, executeQuery }; 
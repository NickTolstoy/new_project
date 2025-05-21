/**
 * Скрипт для миграции данных из localStorage в базу данных MySQL
 * Будет использоваться при переходе от клиентского хранения к серверному
 * 
 * Как использовать:
 * 1. Настройте подключение к базе данных
 * 2. Запустите этот скрипт в браузере или с помощью Node.js
 * 3. Проверьте результаты миграции
 */

// Конфигурация подключения к базе данных (заполните перед использованием)
const DB_CONFIG = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'autoservice_db'
};

/**
 * Класс для миграции данных из localStorage в MySQL
 */
class LocalStorageToMySQLMigrator {
  constructor(config) {
    this.config = config;
    this.connection = null;
    this.stats = {
      forms: { processed: 0, success: 0, failed: 0 },
      reviews: { processed: 0, success: 0, failed: 0 },
      users: { processed: 0, success: 0, failed: 0 }
    };
  }

  /**
   * Инициализация подключения к базе данных
   */
  async connect() {
    // Этот код должен быть заменен на реальное подключение к MySQL
    // Для браузера потребуется API, для Node.js - mysql2/promise
    console.log('Подключение к базе данных...');
    console.log('Используем конфигурацию:', this.config);
    
    // Имитация подключения для демонстрации
    this.connection = {
      async query(sql, params) {
        console.log('Выполняем запрос:', sql);
        console.log('С параметрами:', params);
        return [];
      },
      async end() {
        console.log('Закрываем подключение');
      }
    };
    
    console.log('Подключение успешно установлено');
  }

  /**
   * Миграция форм из localStorage
   */
  async migrateForms() {
    console.log('Начинаем миграцию форм...');
    try {
      // Получаем формы из localStorage
      const formsJson = localStorage.getItem('contactForms');
      if (!formsJson) {
        console.log('Формы не найдены в localStorage');
        return;
      }

      const forms = JSON.parse(formsJson);
      console.log(`Найдено ${forms.length} форм для миграции`);

      // Получаем ID типов форм из базы данных
      const formTypeIds = {
        'contact': 1,
        'review': 3,
        'popup': 5,
        'callback': 2,
        'appointment': 4
      };

      // Обрабатываем каждую форму
      for (const form of forms) {
        this.stats.forms.processed++;
        
        try {
          const formTypeId = formTypeIds[form.formType] || 1; // По умолчанию - контактная форма
          
          // SQL запрос для вставки формы
          const sql = `
            INSERT INTO contact_forms 
            (form_type_id, name, email, phone_number, car_model, service, message, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          
          const params = [
            formTypeId,
            form.name || 'Неизвестно',
            form.email || '',
            form.phone || '',
            form.carModel || '',
            form.service || '',
            form.message || '',
            form.date ? new Date(form.date) : new Date()
          ];
          
          // Выполнение запроса
          await this.connection.query(sql, params);
          this.stats.forms.success++;
          
          // Если это отзыв, мигрируем его также в таблицу отзывов
          if (form.formType === 'review') {
            await this.migrateReview(form);
          }
          
        } catch (error) {
          console.error(`Ошибка при миграции формы ${form.id}:`, error);
          this.stats.forms.failed++;
        }
      }
      
      console.log(`Миграция форм завершена. Успешно: ${this.stats.forms.success}, Ошибок: ${this.stats.forms.failed}`);
      
    } catch (error) {
      console.error('Ошибка при миграции форм:', error);
    }
  }

  /**
   * Миграция отзыва в таблицу reviews
   */
  async migrateReview(reviewForm) {
    try {
      this.stats.reviews.processed++;
      
      // SQL запрос для вставки отзыва
      const sql = `
        INSERT INTO reviews 
        (rating, review_text, car_model, service_name, author_name, created_at, is_verified) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        reviewForm.rating || 5,
        reviewForm.message || '',
        reviewForm.carModel || '',
        reviewForm.service || '',
        reviewForm.name || 'Анонимный пользователь',
        reviewForm.date ? new Date(reviewForm.date) : new Date(),
        true // По умолчанию все старые отзывы верифицированы
      ];
      
      // Выполнение запроса
      await this.connection.query(sql, params);
      this.stats.reviews.success++;
      
    } catch (error) {
      console.error(`Ошибка при миграции отзыва:`, error);
      this.stats.reviews.failed++;
    }
  }

  /**
   * Идентификация уникальных пользователей и перенос их в таблицу users
   */
  async migrateUsers() {
    console.log('Начинаем идентификацию пользователей...');
    try {
      // Получаем формы из localStorage
      const formsJson = localStorage.getItem('contactForms');
      if (!formsJson) {
        console.log('Формы не найдены в localStorage');
        return;
      }

      const forms = JSON.parse(formsJson);
      
      // Создаем объект для хранения уникальных пользователей по телефону
      const uniqueUsers = {};
      
      // Собираем уникальных пользователей из форм
      for (const form of forms) {
        if (form.phone && !uniqueUsers[form.phone]) {
          uniqueUsers[form.phone] = {
            name: form.name || 'Пользователь',
            phone: form.phone,
            email: form.email || `${form.phone.replace(/\D/g, '')}@example.com`,
            date: form.date || new Date().toISOString()
          };
        }
      }
      
      const usersList = Object.values(uniqueUsers);
      console.log(`Найдено ${usersList.length} уникальных пользователей`);
      
      // Мигрируем пользователей
      for (const user of usersList) {
        this.stats.users.processed++;
        
        try {
          // Генерируем временный пароль
          const tempPassword = this.generateTempPassword();
          
          // SQL запрос для вставки пользователя
          const sql = `
            INSERT INTO users 
            (name, email, phone_number, password_hash, registration_date) 
            VALUES (?, ?, ?, ?, ?)
          `;
          
          const params = [
            user.name,
            user.email,
            user.phone,
            tempPassword, // В реальном приложении используйте хеширование
            user.date ? new Date(user.date) : new Date()
          ];
          
          // Выполнение запроса
          await this.connection.query(sql, params);
          this.stats.users.success++;
          
        } catch (error) {
          console.error(`Ошибка при миграции пользователя ${user.phone}:`, error);
          this.stats.users.failed++;
        }
      }
      
      console.log(`Миграция пользователей завершена. Успешно: ${this.stats.users.success}, Ошибок: ${this.stats.users.failed}`);
      
    } catch (error) {
      console.error('Ошибка при миграции пользователей:', error);
    }
  }

  /**
   * Генерация временного пароля
   */
  generateTempPassword() {
    return 'temp_' + Math.random().toString(36).substring(2, 10);
  }

  /**
   * Запуск полной миграции
   */
  async migrateAll() {
    try {
      await this.connect();
      
      // Начнем с миграции форм, т.к. они содержат все данные
      await this.migrateForms();
      
      // Затем идентифицируем и мигрируем пользователей
      await this.migrateUsers();
      
      console.log('Миграция успешно завершена!');
      console.log('Статистика миграции:', this.stats);
      
    } catch (error) {
      console.error('Ошибка при миграции:', error);
    } finally {
      if (this.connection) {
        await this.connection.end();
      }
    }
  }
}

// Функция для запуска миграции
function startMigration() {
  const migrator = new LocalStorageToMySQLMigrator(DB_CONFIG);
  migrator.migrateAll()
    .then(() => {
      console.log('Процесс миграции завершен.');
    })
    .catch((error) => {
      console.error('Ошибка в процессе миграции:', error);
    });
}

// Экспорт для использования с Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LocalStorageToMySQLMigrator,
    startMigration
  };
} else {
  // В браузере добавляем в глобальную область видимости
  window.LocalStorageToMySQLMigrator = LocalStorageToMySQLMigrator;
  window.startMigration = startMigration;
} 
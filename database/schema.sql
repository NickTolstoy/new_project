-- Создание базы данных
CREATE DATABASE IF NOT EXISTS autoservice_db;
USE autoservice_db;

-- Таблица пользователей
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    role ENUM('customer', 'admin', 'manager', 'technician') DEFAULT 'customer'
);

-- Таблица автомобилей пользователей
CREATE TABLE user_cars (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year_of_manufacture INT,
    vin_code VARCHAR(20) UNIQUE,
    battery_capacity FLOAT,
    mileage INT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Таблица категорий услуг
CREATE TABLE service_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon_url VARCHAR(255)
);

-- Таблица услуг
CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price_from DECIMAL(10, 2),
    price_to DECIMAL(10, 2),
    duration_minutes INT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES service_categories(category_id)
);

-- Таблица статусов работ
CREATE TABLE service_statuses (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL
);

-- Таблица записей на обслуживание (appointments)
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status_id INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (car_id) REFERENCES user_cars(car_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (status_id) REFERENCES service_statuses(status_id)
);

-- Таблица выполненных работ
CREATE TABLE service_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    service_id INT NOT NULL,
    technician_id INT,
    service_date TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    parts_used TEXT,
    notes TEXT,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (car_id) REFERENCES user_cars(car_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (technician_id) REFERENCES users(user_id)
);

-- Таблица отзывов
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_id INT,
    service_history_id INT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    car_model VARCHAR(100),
    service_name VARCHAR(100),
    author_name VARCHAR(100),
    author_email VARCHAR(255),
    author_phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE SET NULL,
    FOREIGN KEY (service_history_id) REFERENCES service_history(history_id) ON DELETE SET NULL
);

-- Таблица всех типов форм обратной связи
CREATE TABLE form_types (
    form_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

-- Таблица форм обратной связи
CREATE TABLE IF NOT EXISTS contact_forms (
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

-- Таблица статей блога
CREATE TABLE blog_posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    author_id INT,
    featured_image_url VARCHAR(255),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Таблица категорий блога
CREATE TABLE blog_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- Связующая таблица между статьями и категориями
CREATE TABLE blog_post_categories (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES blog_categories(category_id) ON DELETE CASCADE
);

-- Таблица комментариев к блогу
CREATE TABLE blog_comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT,
    parent_comment_id INT,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (parent_comment_id) REFERENCES blog_comments(comment_id) ON DELETE CASCADE
);

-- Таблица для токенов сессий и восстановления паролей
CREATE TABLE user_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    token_type ENUM('session', 'password_reset', 'email_verification') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Таблица уведомлений пользователей
CREATE TABLE user_notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_entity VARCHAR(50),
    related_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Таблица настроек пользователя
CREATE TABLE user_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT TRUE,
    theme VARCHAR(20) DEFAULT 'dark',
    language VARCHAR(10) DEFAULT 'ru',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Начальные данные для статусов работ
INSERT INTO service_statuses (name, color) VALUES 
('Новая', '#3498DB'),
('Подтверждена', '#2ECC71'),
('В работе', '#F39C12'),
('Завершена', '#27AE60'),
('Отменена', '#E74C3C');

-- Начальные данные для типов форм
INSERT INTO form_types (name, description) VALUES 
('contact', 'Общая форма обратной связи'),
('callback', 'Запрос обратного звонка'),
('review', 'Форма отзыва'),
('appointment', 'Запись на обслуживание'),
('popup', 'Всплывающая форма');

-- Начальные данные для категорий услуг
INSERT INTO service_categories (name, description, slug, icon_url) VALUES
('Диагностика', 'Все виды диагностики электромобилей', 'diagnostics', '/icons/diagnostics.svg'),
('Ремонт батарей', 'Ремонт и обслуживание батарей электромобилей', 'battery-repair', '/icons/battery.svg'),
('Электродвигатели', 'Диагностика и ремонт электродвигателей', 'electric-motors', '/icons/motor.svg'),
('Программное обеспечение', 'Обновление и диагностика ПО', 'software', '/icons/software.svg'),
('Техническое обслуживание', 'Плановое ТО электромобилей', 'maintenance', '/icons/maintenance.svg');

-- Создание индексов для улучшения производительности
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_contact_forms_user_id ON contact_forms(user_id);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_car_id ON appointments(car_id);
CREATE INDEX idx_service_history_user_id ON service_history(user_id);
CREATE INDEX idx_service_history_car_id ON service_history(car_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id); 
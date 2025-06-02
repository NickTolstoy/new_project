import { ReactNode } from 'react';

/**
 * Интерфейс для компонента InputMask
 */
export interface InputMaskProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Интерфейс для данных формы
 */
export interface ContactFormData {
  id?: string | number;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service?: string;
  car?: string;
  date?: string; // Дата создания заявки
  isProcessed?: boolean; // Флаг обработки заявки
  processedAt?: string; // Дата обработки заявки
  formType: 'contact' | 'service' | 'review' | 'newsletter' | 'popup'; // Тип формы
  rating?: number; // Рейтинг для отзывов
  carModel?: string; // Модель автомобиля для отзывов
  serviceType?: string; // Тип услуги для отзывов
  verified?: boolean; // Проверен ли отзыв администратором
  isActive?: boolean; // Активна ли подписка (для newsletter)
  unsubscribeToken?: string; // Токен для отписки (для newsletter)
}

/**
 * Интерфейс для ввода формы
 */
export interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}

/**
 * Интерфейс для текстовой области формы
 */
export interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  error?: string;
  className?: string;
}

/**
 * Интерфейс для выпадающего списка формы
 */
export interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}

/**
 * Интерфейс для кнопки формы
 */
export interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Интерфейс для данных формы подписки на новости
 */
export interface NewsletterFormData {
  id?: string | number;
  email: string;
  name?: string;
  date?: string; // Дата подписки
  isActive?: boolean; // Активна ли подписка
  unsubscribeToken?: string; // Токен для отписки
  formType: 'newsletter'; // Тип формы
} 
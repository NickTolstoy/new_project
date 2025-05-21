/**
 * Интерфейс для результата отправки отзыва
 */
export interface ReviewSubmitResult {
  success: boolean;
  message?: string;
  reviewId?: number;
  isOffline?: boolean;
}

/**
 * Интерфейс для данных отзыва
 */
export interface ReviewData {
  name: string;
  phone?: string;
  email?: string;
  carModel?: string;
  service?: string;
  message: string;
  rating: number;
  [key: string]: any;
}

/**
 * Интерфейс для отзыва, полученного с сервера
 */
export interface ReviewItem {
  id: string | number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  car: string;
  service: string;
  verified: number | boolean;
  [key: string]: any;
}

/**
 * Отправка отзыва на сервер
 * @param reviewData Данные отзыва
 */
export function submitReview(reviewData: ReviewData): Promise<ReviewSubmitResult>;

/**
 * Получение всех отзывов с сервера
 */
export function getReviews(): Promise<ReviewItem[]>;

/**
 * Проверка статуса подключения к базе данных
 */
export function checkDatabaseConnection(): Promise<boolean>;

/**
 * Верификация отзыва администратором
 * @param reviewId ID отзыва
 */
export function verifyReview(reviewId: number | string): Promise<boolean>;

/**
 * Обновление отзыва администратором
 * @param reviewId ID отзыва
 * @param updateData Данные для обновления
 */
export function updateReview(
  reviewId: number | string, 
  updateData: { carModel?: string, service?: string }
): Promise<boolean>; 
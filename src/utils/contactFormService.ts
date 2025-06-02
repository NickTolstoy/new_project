import { ContactFormData, NewsletterFormData } from '../components/shared/FormComponents';

// URL API
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Интерфейс для результата отправки формы
 */
export interface FormSubmitResult {
  success: boolean;
  message?: string;
  formId?: number;
  isOffline?: boolean;
}

/**
 * Отправка формы обратной связи на сервер
 * @param formData Данные формы
 */
export async function submitContactForm(formData: Partial<ContactFormData>): Promise<FormSubmitResult> {
  try {
    // Проверяем подключение к сети
    if (!navigator.onLine) {
      console.log('Нет подключения к интернету. Сохраняем форму локально.');
      
      // Сохраняем форму локально
      saveFormLocally(formData);
      
      return {
        success: true,
        message: 'Заявка сохранена локально. Она будет отправлена, когда появится подключение к интернету.',
        isOffline: true
      };
    }
    
    // Отправляем форму на сервер
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Форма успешно отправлена на сервер:', result);
      return {
        success: true,
        message: 'Спасибо за ваше обращение! Заявка успешно отправлена.',
        formId: result.formId
      };
    } else {
      console.error('Ошибка при отправке формы:', result.message);
      
      // В случае ошибки также сохраняем локально
      saveFormLocally(formData);
      
      return {
        success: false,
        message: result.message || 'Ошибка при отправке заявки. Попробуйте позже.'
      };
    }
  } catch (error) {
    console.error('Произошла ошибка при отправке формы:', error);
    
    // В случае ошибки сохраняем локально
    saveFormLocally(formData);
    
    return {
      success: false,
      message: 'Произошла ошибка при отправке заявки. Попробуйте позже.'
    };
  }
}

/**
 * Отправка формы подписки на новости
 * @param newsletterData Данные формы подписки
 */
export async function submitNewsletterForm(newsletterData: Partial<NewsletterFormData>): Promise<FormSubmitResult> {
  try {
    // Проверяем подключение к сети
    if (!navigator.onLine) {
      console.log('Нет подключения к интернету. Сохраняем форму подписки локально.');
      
      // Сохраняем форму локально с типом newsletter
      saveFormLocally({
        ...newsletterData,
        formType: 'newsletter'
      });
      
      return {
        success: true,
        message: 'Подписка сохранена локально. Она будет оформлена, когда появится подключение к интернету.',
        isOffline: true
      };
    }
    
    // Отправляем форму подписки на сервер
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newsletterData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Подписка успешно оформлена:', result);
      return {
        success: true,
        message: 'Спасибо за подписку на новости! Подтвердите подписку, перейдя по ссылке в письме.',
        formId: result.formId
      };
    } else {
      console.error('Ошибка при оформлении подписки:', result.message);
      
      // В случае ошибки также сохраняем локально
      saveFormLocally({
        ...newsletterData,
        formType: 'newsletter'
      });
      
      return {
        success: false,
        message: result.message || 'Ошибка при оформлении подписки. Попробуйте позже.'
      };
    }
  } catch (error) {
    console.error('Произошла ошибка при оформлении подписки:', error);
    
    // В случае ошибки сохраняем локально
    saveFormLocally({
      ...newsletterData,
      formType: 'newsletter'
    });
    
    return {
      success: false,
      message: 'Произошла ошибка при оформлении подписки. Попробуйте позже.'
    };
  }
}

/**
 * Отписка от рассылки новостей
 * @param token Токен для отписки
 */
export async function unsubscribeNewsletter(token: string): Promise<FormSubmitResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Успешная отписка от рассылки');
      return {
        success: true,
        message: 'Вы успешно отписались от рассылки новостей.'
      };
    } else {
      console.error('Ошибка при отписке от рассылки:', result.message);
      return {
        success: false,
        message: result.message || 'Ошибка при отписке от рассылки. Попробуйте позже.'
      };
    }
  } catch (error) {
    console.error('Произошла ошибка при отписке от рассылки:', error);
    return {
      success: false,
      message: 'Произошла ошибка при отписке от рассылки. Попробуйте позже.'
    };
  }
}

/**
 * Получение всех форм обратной связи с сервера
 */
export async function getAllForms(): Promise<ContactFormData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/forms`);
    const data = await response.json();
    
    if (data.success && Array.isArray(data.forms)) {
      console.log('Получены формы с сервера:', data.forms);
      return data.forms;
    } else {
      console.error('Ошибка получения форм:', data.message || 'Неизвестная ошибка');
      return [];
    }
  } catch (error) {
    console.error('Произошла ошибка при получении форм:', error);
    return [];
  }
}

/**
 * Получение всех подписок на новости
 */
export const getAllNewsletterSubscriptions = async (): Promise<NewsletterFormData[]> => {
  try {
    console.log('[DEBUG] Запрос подписок на новости...');
    const response = await fetch('http://localhost:8000/api/newsletter/subscriptions');
    const data = await response.json();
    
    console.log('[DEBUG] Получен ответ от сервера:', data);
    
    if (data.success && Array.isArray(data.data)) {
      console.log('[DEBUG] Подписки получены успешно:', data.data);
      return data.data;
    } else if (data.success && Array.isArray(data.subscriptions)) {
      console.log('[DEBUG] Подписки получены успешно (альтернативный формат):', data.subscriptions);
      return data.subscriptions;
    } else {
      console.error('[DEBUG] Ошибка получения подписок:', data.message || 'Неизвестная ошибка');
      return [];
    }
  } catch (error) {
    console.error('[DEBUG] Ошибка при получении подписок:', error);
    return [];
  }
};

/**
 * Удаление формы
 * @param formId ID формы для удаления
 */
export async function deleteForm(formId: number | string): Promise<boolean> {
  try {
    console.log(`[DELETE FORM] Отправка запроса на удаление формы с ID ${formId}...`);
    const url = `${API_BASE_URL}/admin/forms/${formId}`;
    console.log(`[DELETE FORM] URL запроса: ${url}`);
    
    const response = await fetch(url, {
      method: 'DELETE'
    });
    
    console.log(`[DELETE FORM] Получен ответ со статусом: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[DELETE FORM] Ошибка HTTP: ${response.status} ${response.statusText}`);
      return false;
    }
    
    const data = await response.json();
    console.log(`[DELETE FORM] Ответ API:`, data);
    
    if (data.success) {
      console.log(`[DELETE FORM] Форма успешно удалена: ${formId}`);
      return true;
    } else {
      console.error(`[DELETE FORM] Ошибка при удалении формы: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error(`[DELETE FORM] Произошла ошибка при удалении формы:`, error);
    return false;
  }
}

/**
 * Удаление подписки на новости
 * @param {string|number} id ID подписки
 * @returns {Promise<boolean>} Результат операции
 */
export const deleteNewsletterSubscription = async (id: string | number): Promise<boolean> => {
  try {
    console.log(`[DEBUG] Удаление подписки с ID ${id}`);
    const response = await fetch(`${API_BASE_URL}/newsletter/subscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log(`[DEBUG] Результат удаления подписки:`, data);
    return data.success || false;
  } catch (error) {
    console.error('[DEBUG] Ошибка при удалении подписки:', error);
    return false;
  }
};

/**
 * Обновление статуса формы (например, отметка "обработана")
 * @param formId ID формы
 * @param status Новый статус
 */
export async function updateFormStatus(formId: number | string, status: { [key: string]: any }): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/forms/${formId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Статус формы успешно обновлен:', formId);
      return true;
    } else {
      console.error('Ошибка при обновлении статуса формы:', data.message);
      return false;
    }
  } catch (error) {
    console.error('Произошла ошибка при обновлении статуса формы:', error);
    return false;
  }
}

/**
 * Обновление статуса подписки
 * @param {string|number} id ID подписки
 * @param {Object} updateData Данные для обновления
 * @returns {Promise<boolean>} Результат операции
 */
export const updateNewsletterStatus = async (id: string | number, updateData: { isActive?: boolean }): Promise<boolean> => {
  try {
    console.log(`[DEBUG] Обновление статуса подписки с ID ${id}:`, updateData);
    const response = await fetch(`${API_BASE_URL}/newsletter/subscriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    console.log(`[DEBUG] Результат обновления статуса подписки:`, data);
    return data.success || false;
  } catch (error) {
    console.error('[DEBUG] Ошибка при обновлении статуса подписки:', error);
    return false;
  }
};

/**
 * Проверка авторизации администратора
 * @param credentials Данные для входа
 */
export async function adminLogin(credentials: { username: string, password: string }): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Сохраняем токен авторизации
      localStorage.setItem('adminToken', data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    return false;
  }
}

/**
 * Сохранение формы локально
 */
function saveFormLocally(formData: Partial<ContactFormData | NewsletterFormData>): void {
  try {
    // Получаем существующие формы
    let localForms = [];
    const storedForms = localStorage.getItem('contactForms');
    
    if (storedForms) {
      localForms = JSON.parse(storedForms);
      
      if (!Array.isArray(localForms)) {
        localForms = [];
      }
    }
    
    // Добавляем новую форму
    localForms.push({
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      savedAt: new Date().toISOString(),
      synced: false
    });
    
    // Сохраняем формы в localStorage
    localStorage.setItem('contactForms', JSON.stringify(localForms));
    
    console.log('Форма сохранена локально');
  } catch (error) {
    console.error('Ошибка при сохранении формы локально:', error);
  }
} 
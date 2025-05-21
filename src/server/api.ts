import { Router, Request, Response } from 'express';
import { sendContactForm, ContactFormData } from '../utils/emailService';

const router = Router();

// Обработчик POST-запроса для отправки данных формы
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const formData: ContactFormData = req.body;
    
    // Проверка обязательных полей
    if (!formData.name || !formData.phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Необходимо указать имя и телефон' 
      });
    }
    
    // Отправка email
    const success = await sendContactForm(formData);
    
    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка успешно отправлена' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Ошибка при отправке заявки' 
      });
    }
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Внутренняя ошибка сервера' 
    });
  }
});

export default router; 
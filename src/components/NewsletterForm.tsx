import React, { useState } from 'react';
import { submitNewsletterForm } from '../utils/contactFormService';
import { NewsletterFormData } from '../components/shared/FormComponents';

interface NewsletterFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
  showName?: boolean;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = '', onSubmitSuccess, showName = false }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitResult({
        success: false,
        message: 'Пожалуйста, введите ваш email'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Подготавливаем данные формы
      const formData: Partial<NewsletterFormData> = {
        email,
        formType: 'newsletter'
      };
      
      // Добавляем имя, если оно есть и если нужно показывать поле имени
      if (showName && name) {
        formData.name = name;
      }
      
      // Отправляем форму
      const result = await submitNewsletterForm(formData);
      
      setSubmitResult({
        success: result.success,
        message: result.message || (result.success 
          ? 'Спасибо за подписку на новости!' 
          : 'Произошла ошибка при оформлении подписки. Попробуйте позже.')
      });
      
      // Если подписка успешно оформлена, очищаем форму
      if (result.success) {
        setEmail('');
        setName('');
        
        // Вызываем callback после успешной отправки, если он был передан
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }
    } catch (error) {
      console.error('Ошибка при отправке формы подписки:', error);
      setSubmitResult({
        success: false,
        message: 'Произошла ошибка при оформлении подписки. Попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`newsletter-form ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {showName && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full bg-bg-secondary/70 border border-white/10 rounded-full py-2 px-4 focus:outline-none focus:border-accent-blue/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        
        <div className="relative">
          <input
            type="email"
            placeholder="Ваш e-mail"
            className="w-full bg-bg-secondary/70 border border-white/10 rounded-full py-2 px-4 focus:outline-none focus:border-accent-blue/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-green text-text-primary font-bold transition-all duration-300 hover:shadow-neon hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Подписаться'}
        </button>
      </form>
      
      {submitResult && (
        <div className={`mt-3 text-sm ${submitResult.success ? 'text-green-400' : 'text-red-400'}`}>
          {submitResult.message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm; 
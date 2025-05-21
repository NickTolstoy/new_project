import React from 'react'

// Интерфейс для данных формы
export interface ContactFormData {
  id: string;
  name: string;
  phone: string;
  email: string;
  carModel: string;
  service: string; // Может быть 'contact', 'popup' или название услуги для отзывов
  message: string;
  date: string;
  rating?: number; // Опциональное поле для отзывов
  formType?: 'contact' | 'popup' | 'review'; // Тип формы для лучшей идентификации
  isProcessed?: boolean; // Статус обработки формы
  processedAt?: string; // Дата обработки
  processedBy?: string; // Кто обработал форму
  verified?: boolean; // Статус верификации отзыва
}

// Компонент маски для телефона
export const InputMask = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const applyMask = (input: string) => {
    // Удаляем все нецифровые символы
    const numbersOnly = input.replace(/\D/g, '')
    
    // Ограничиваем ввод 10 цифрами (без учета кода страны)
    const limited = numbersOnly.slice(0, 10)
    
    // Применяем маску
    let result = '+7'
    
    if (limited.length > 0) {
      result += ` (${limited.slice(0, 3)}`
      
      if (limited.length > 3) {
        result += `) ${limited.slice(3, 6)}`
      }
      
      if (limited.length > 6) {
        result += `-${limited.slice(6, 8)}`
      }
      
      if (limited.length > 8) {
        result += `-${limited.slice(8, 10)}`
      }
    }
    
    return result
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    onChange(applyMask(rawValue))
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем: backspace, delete, tab, escape, enter, цифры
    if ([8, 9, 13, 27, 46].indexOf(e.keyCode) !== -1 ||
        // Стрелки 
        (e.keyCode >= 35 && e.keyCode <= 40) ||
        // Цифры на клавиатуре и над клавиатурой
        ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
      // Ничего не делаем
      return;
    }
    e.preventDefault();
  }
  
  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
      placeholder="+7 (___) ___-__-__"
    />
  )
} 
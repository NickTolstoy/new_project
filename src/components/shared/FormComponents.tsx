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
  // Ссылка на input-элемент для работы с фокусом
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const applyMask = (input: string) => {
    // Удаляем все нецифровые символы
    let numbersOnly = input.replace(/\D/g, '')
    
    // Если пользователь начал ввод с 7 или 8, игнорируем эту цифру
    if (numbersOnly.length > 0 && (numbersOnly[0] === '7' || numbersOnly[0] === '8')) {
      numbersOnly = numbersOnly.substring(1)
    }
    
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
    
    // Если пользователь стер все до пустой строки, вернем +7
    if (!rawValue || rawValue === '') {
      onChange('+7')
      return
    }
    
    // Если пользователь стер до значения короче +7, вернем +7
    if (rawValue.length < 2) {
      onChange('+7')
      return
    }
    
    onChange(applyMask(rawValue))
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Получаем текущую позицию курсора
    const cursorPos = e.currentTarget.selectionStart || 0;
    
    // Если пользователь пытается стереть +7, не даем ему это сделать
    if (e.keyCode === 8 && cursorPos <= 2) {
      e.preventDefault();
      return;
    }
    
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
  
  // Если поле пустое, устанавливаем начальное значение +7
  React.useEffect(() => {
    if (!value) {
      onChange('+7')
    }
  }, [])
  
  // Обработчик фокуса - устанавливаем курсор после +7
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Если значение пустое или только +7, ставим курсор после +7
    if (e.target.value === '+7') {
      // Откладываем на следующий тик, чтобы дать браузеру перерисовать элемент
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(2, 2);
        }
      }, 0);
    }
  };
  
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="tel"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className="w-full bg-bg-secondary/70 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent-blue/50"
        placeholder="+7 (___) ___-__-__"
      />
    </div>
  )
} 
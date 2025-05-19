import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withIcon?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  withIcon = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-accent-blue to-accent-green text-text-primary hover:shadow-neon hover:scale-105',
    secondary: 'bg-opacity-30 bg-bg-secondary backdrop-blur-glass border border-accent-blue/30 text-text-primary hover:border-accent-blue/80 hover:shadow-neon',
    ghost: 'bg-transparent text-text-primary hover:bg-white/5',
    outline: 'bg-transparent border border-text-secondary text-text-primary hover:border-accent-blue hover:text-accent-blue',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const iconStyles = withIcon ? 'gap-2' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${iconStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 
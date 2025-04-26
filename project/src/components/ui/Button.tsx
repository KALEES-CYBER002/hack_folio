import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500':
            variant === 'primary',
          'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500':
            variant === 'secondary',
          'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500 text-gray-900 dark:text-gray-100':
            variant === 'outline',
          'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500 text-gray-900 dark:text-gray-100':
            variant === 'ghost',
          'bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500':
            variant === 'danger',
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
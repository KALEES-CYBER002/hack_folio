import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('mb-4', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          className={cn(
            'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white bg-white dark:bg-dark-200 border-gray-300 dark:border-gray-700',
            error && 'border-error-500 focus:ring-error-500',
            fullWidth && 'w-full',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, Omit<InputProps, 'ref'> & { rows?: number }>(
  ({ label, error, className, rows = 4, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('mb-4', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white bg-white dark:bg-dark-200 border-gray-300 dark:border-gray-700',
            error && 'border-error-500 focus:ring-error-500',
            fullWidth && 'w-full',
            className
          )}
          rows={rows}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
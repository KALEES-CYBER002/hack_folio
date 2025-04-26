import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ 
  children, 
  className, 
  hoverEffect = false 
}: CardProps) => {
  return (
    <div 
      className={cn(
        'bg-white dark:bg-dark-100 rounded-xl shadow-sm p-6 transition-all duration-300',
        hoverEffect && 'hover:shadow-md hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn('text-xl font-semibold', className)}>
      {children}
    </h3>
  );
};

export const CardContent = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('text-gray-700 dark:text-gray-300', className)}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};
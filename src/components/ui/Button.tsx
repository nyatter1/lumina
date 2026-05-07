import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-900 text-white hover:bg-brand-800 shadow-sm transition-all active:scale-95',
      secondary: 'bg-brand-100 text-brand-900 hover:bg-brand-200 transition-all active:scale-95',
      outline: 'border-2 border-brand-200 bg-transparent hover:bg-brand-50 text-brand-900 transition-all active:scale-95',
      ghost: 'bg-transparent hover:bg-brand-50 text-brand-700 transition-colors',
      danger: 'bg-red-500 text-white hover:bg-red-600 transition-all active:scale-95',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg',
      md: 'px-4 py-2 text-sm font-medium rounded-xl',
      lg: 'px-6 py-3 text-base font-semibold rounded-2xl',
      icon: 'p-2 rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

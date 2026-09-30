import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Reusable Accessible Input Component
 *
 * Props:
 *  - id: string (required for label/aria connection)
 *  - label: string (optional visible label)
 *  - error: string | null (error message)
 *  - helperText: string (optional hint text)
 *  - icon: LucideIcon (optional left-aligned icon)
 *  - rightAction: ReactNode (optional right action e.g. password toggle)
 *  - className: string (additional input styling)
 *  - containerClassName: string (wrapper styling)
 */
export const Input = forwardRef(function Input(
  {
    id,
    label,
    error,
    helperText,
    icon: Icon,
    rightAction,
    type = 'text',
    disabled = false,
    required = false,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  // Determine aria-describedby for accessibility
  const describedBy = [
    error && errorId,
    helperText && helperId,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('space-y-1.5 text-left', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-brand-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <Icon
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none transition-colors"
            aria-hidden="true"
          />
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'w-full bg-slate-800/80 border rounded-xl py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200',
            'focus:ring-2 focus:ring-brand-500 focus:border-brand-500/60 focus:bg-slate-800',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-900',
            Icon ? 'pl-10' : 'pl-3.5',
            rightAction ? 'pr-11' : 'pr-4',
            error
              ? 'border-rose-500/70 focus:ring-rose-500 focus:border-rose-500'
              : 'border-slate-700/80 hover:border-slate-600',
            className
          )}
          {...props}
        />

        {rightAction && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
            {rightAction}
          </div>
        )}
      </div>

      {/* Accessible Error Announcement */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-rose-400 flex items-center gap-1.5 mt-1 animate-fade-in font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {/* Accessible Helper / Hint Text */}
      {!error && helperText && (
        <p id={helperId} className="text-xs text-slate-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;

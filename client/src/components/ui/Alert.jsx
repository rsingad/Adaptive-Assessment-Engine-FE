import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Reusable Alert / Feedback Component
 *
 * Props:
 *  - variant: 'info' | 'success' | 'warning' | 'error'
 *  - title: string (optional bold title)
 *  - children: ReactNode (message content)
 *  - onClose: func (optional close callback)
 *  - className: string
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) {
  const configs = {
    info: {
      icon: Info,
      wrapperClass: 'bg-brand-500/10 border-brand-500/30 text-brand-200',
      iconClass: 'text-brand-400',
    },
    success: {
      icon: CheckCircle2,
      wrapperClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
      iconClass: 'text-emerald-400',
    },
    warning: {
      icon: AlertTriangle,
      wrapperClass: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
      iconClass: 'text-amber-400',
    },
    error: {
      icon: AlertCircle,
      wrapperClass: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
      iconClass: 'text-rose-400',
    },
  };

  const current = configs[variant] || configs.info;
  const Icon = current.icon;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border text-sm transition-all animate-fade-in shadow-sm',
        current.wrapperClass,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', current.iconClass)} aria-hidden="true" />
      
      <div className="flex-1 space-y-0.5 leading-relaxed">
        {title && <h4 className="font-semibold tracking-tight">{title}</h4>}
        <div className="text-xs sm:text-sm font-normal opacity-95">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;

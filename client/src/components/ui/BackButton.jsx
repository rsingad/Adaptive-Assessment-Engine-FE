import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/helpers';

/**
 * Reusable BackButton Component
 *
 * Ensures consistent back navigation with a minimum 44px touch target,
 * visible focus ring, and optional custom fallback path.
 *
 * Props:
 *  - to: string (optional explicit fallback path if browser history has no previous entry)
 *  - label: string (default: "Back")
 *  - className: string
 */
export function BackButton({
  to,
  label = 'Back',
  className = '',
  ...props
}) {
  const navigate = useNavigate();

  function handleClick() {
    if (to) {
      navigate(to);
    } else {
      // Step back in history if possible, else fallback to home
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Go back to previous page: ${label}`}
      className={cn(
        'inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white',
        'bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700',
        'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        'cursor-pointer select-none group',
        className
      )}
      {...props}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;

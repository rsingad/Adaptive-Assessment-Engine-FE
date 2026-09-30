import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Reusable Skeleton Shimmer Component
 *
 * Supports variants: 'text' | 'title' | 'avatar' | 'card' | 'chart' | 'custom'
 * Automatically respects prefers-reduced-motion via index.css
 */
export function Skeleton({
  variant = 'text',
  className = '',
  width,
  height,
  ...props
}) {
  const baseStyles = 'skeleton-shimmer rounded-xl select-none pointer-events-none';

  const variants = {
    text: 'h-4 w-full rounded-md',
    title: 'h-7 w-3/4 rounded-lg',
    avatar: 'h-12 w-12 rounded-2xl',
    card: 'h-48 w-full rounded-2xl border border-slate-800/60',
    chart: 'h-64 w-full rounded-2xl border border-slate-800/60',
    button: 'h-11 w-32 rounded-xl',
    custom: '',
  };

  const inlineStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      role="status"
      aria-label="Loading content..."
      style={inlineStyles}
      className={cn(baseStyles, variants[variant] || variants.text, className)}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Skeleton;

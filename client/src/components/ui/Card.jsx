import React from 'react';

export function Card({
  children,
  className = '',
  hoverEffect = false,
  glass = true,
  ...props
}) {
  const baseStyle = 'rounded-2xl border transition-all duration-200';
  const glassStyle = glass 
    ? 'bg-slate-900/70 backdrop-blur-xl border-slate-800/80 shadow-xl shadow-black/20' 
    : 'bg-slate-900 border-slate-800 shadow-md';
  const hoverStyle = hoverEffect 
    ? 'hover:border-slate-700 hover:shadow-2xl hover:shadow-brand-500/5 hover:-translate-y-0.5' 
    : '';

  return (
    <div
      className={`${baseStyle} ${glassStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 sm:p-6 border-b border-slate-800/60 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-5 sm:p-6 border-t border-slate-800/60 ${className}`}>{children}</div>;
}

export default Card;

'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface NodeButtonProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function NodeButton({
  label,
  icon: Icon,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children
}: NodeButtonProps) {
  const baseClasses = `
    relative
    group
    flex
    flex-col
    items-center
    justify-center
    cursor-pointer
    transition-all
    duration-300
    ease-out
    transform
    hover:scale-110
    active:scale-95
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    touch-manipulation
    select-none
    focus:outline-none
    focus:ring-2
    focus:ring-innovation
    focus:ring-offset-2
    focus:ring-offset-black
    rounded-2xl
  `;

  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20 text-base',
    md: 'w-20 h-20 sm:w-24 sm:h-24 text-lg',
    lg: 'w-28 h-28 sm:w-32 sm:h-32 text-xl'
  };

  const variantClasses = {
    primary: `
      bg-black/80
      text-white
      border-2
      border-trust
      backdrop-blur-sm
      hover:shadow-[0_0_20px_rgba(37,252,17,0.6)]
      hover:border-innovation
      transition-all
      duration-300
    `,
    secondary: `
      bg-black/80
      text-white
      border-2
      border-trust
      backdrop-blur-sm
      hover:shadow-[0_0_20px_rgba(37,252,17,0.6)]
      hover:border-innovation
      transition-all
      duration-300
    `,
    ghost: `
      bg-black/80
      text-white
      border-2
      border-trust
      backdrop-blur-sm
      hover:shadow-[0_0_20px_rgba(37,252,17,0.6)]
      hover:border-innovation
      transition-all
      duration-300
    `
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >


      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-2">
        {/* Icon */}
        {Icon && (
          <Icon
            size={iconSizes[size]}
            className="mb-2 transition-transform duration-300 group-hover:scale-110 text-white"
          />
        )}
        
        {/* Children (for custom content) */}
        {children && (
          <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
            {children}
          </div>
        )}

        {/* Label */}
        <span className="font-semibold leading-tight transition-all duration-300 text-white text-center">
          {label}
        </span>
      </div>


    </div>
  );
}

// Export a simpler version for basic usage
export function SimpleNodeButton({
  label,
  icon: Icon,
  onClick,
  className = ''
}: {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <NodeButton
      label={label}
      icon={Icon}
      onClick={onClick}
      className={className}
    />
  );
}

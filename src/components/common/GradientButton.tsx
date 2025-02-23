import React from 'react';
import Link from 'next/link';

interface GradientButtonProps {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  href,
  icon,
  className = '',
  onClick
}) => {
  const buttonClasses = `
    inline-flex
    items-center
    gap-2
    px-6
    py-3
    text-base
    font-medium
    text-white
    bg-gradient-to-r
    from-blue-500
    to-blue-700
    hover:from-blue-600
    hover:to-blue-800
    rounded-full
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
    ${className}
  `;

  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={buttonClasses}>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </Link>
  );
};

export default GradientButton;

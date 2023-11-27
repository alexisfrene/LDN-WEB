import React from 'react';

interface PrimaryButtonProps {
  onClick?: () => void;
  label: string;
  bgColor?: string;
  hoverColor?: string;
  additionalClasses?: string;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  label,
  bgColor = 'bg-amber-500',
  hoverColor = 'hover:bg-amber-600',
  additionalClasses = '',
  icon,
}) => {
  return (
    <button
      className={`py-2 px-4 rounded-md focus:outline-none ${bgColor} ${hoverColor} text-white ${additionalClasses}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

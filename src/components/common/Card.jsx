// src/components/common/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  title, 
  action,
  padding = "normal", // 'none' | 'small' | 'normal' | 'large'
  headerBorder = true,
  shadow = "sm" // 'none' | 'sm' | 'md' | 'lg'
}) => {
  // Responsive padding configurations
  const paddingClasses = {
    none: "",
    small: "p-3 sm:p-4",
    normal: "p-4 sm:p-5 lg:p-6",
    large: "p-5 sm:p-6 lg:p-8"
  };

  // Shadow configurations
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };

  const hasHeader = title || action;

  return (
    <div 
      className={`
        bg-white rounded-lg sm:rounded-xl 
        ${shadowClasses[shadow]} 
        border border-gray-200 
        overflow-hidden
        ${className}
      `}
    >
      {hasHeader && (
        <div 
          className={`
            px-4 sm:px-5 lg:px-6 
            py-3 sm:py-4 
            flex flex-col sm:flex-row 
            sm:items-center 
            justify-between 
            gap-2 sm:gap-0
            ${headerBorder ? 'border-b border-gray-200' : ''}
          `}
        >
          {title && (
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
              {title}
            </h3>
          )}
          {action && (
            <div className="flex-shrink-0 self-start sm:self-auto">
              {action}
            </div>
          )}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  );
};

export default Card;
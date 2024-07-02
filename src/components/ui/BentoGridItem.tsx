import React from 'react';

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  header: React.ReactNode;
  icon: React.ReactNode;
  footer?: React.ReactNode;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({ className, title, description, header, icon, footer }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {header}
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-xl font-bold">{title}</h3>
      </div>
      <p>{description}</p>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "relative overflow-hidden rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary: `bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D] text-white shadow-lg shadow-[#FF9F1C]/20 hover:shadow-[#FF9F1C]/40 hover:scale-[1.02]`,
    secondary: `bg-white/10 backdrop-blur-md text-white border border-[#FF9F1C]/30 hover:bg-white/20 hover:border-[#FF9F1C]/50`,
    danger: `bg-gradient-to-r from-[#FF4D8D] to-[#FF9F1C] text-white shadow-lg shadow-[#FF4D8D]/20 hover:shadow-[#FF4D8D]/40`,
    ghost: `bg-transparent text-gray-400 hover:text-white hover:bg-white/5`
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </motion.button>
  );
};
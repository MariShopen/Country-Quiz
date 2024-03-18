import React from "react";

export type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function QuestionButton({
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`w-10 h-10 rounded-full text-graybg bg-gradient-to-r from-gradientColor1 to-gradientColor2 m-4 ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

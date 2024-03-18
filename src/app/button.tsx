import React from "react";

export type ButtonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
};

export default function Button({
  className,
  text,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bg-gradient-to-r from-gradientColor1 to-gradientColor2 ${className}`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}

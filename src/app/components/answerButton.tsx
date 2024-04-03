import React, { useState } from "react";
export type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  isClicked: boolean;
  onClick?: () => void;
};

export default function AnswerButton({
  className,
  children,
  onClick,
  isClicked,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${isClicked ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2" : "bg-purple3"}
      hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2
      text-graybg font-semibold w-60 h-16 m-3 text-xl rounded-xl ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

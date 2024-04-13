import React, { ComponentProps, useState } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  isClicked?: boolean;
};

export default function AnswerButton({
  className,
  children,
  onClick,
  isClicked,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${isClicked ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2" : "bg-purple3"}
      ${disabled ? "bg-purple3" : "hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2"}
      text-graybg font-semibold w-60 h-16 m-3 text-xl rounded-xl ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

//  ${disabled ? "bg-purple3" : "hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2"}

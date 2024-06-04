import React, { ComponentProps } from "react";

export type QButtonProps = ComponentProps<"button"> & {
  // disabled: boolean;
  isActive: boolean;
};

export default function QuestionButton({
  className,
  // disabled,
  onClick,
  isActive,
  children,
  ...rest
}: QButtonProps) {
  return (
    <button
      className={`w-12 h-12 rounded-full text-graybg m-2 text-xl font-semibold
        hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2
        ${isActive ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2" : "bg-purple3"}
`}
      onClick={onClick}
      // disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

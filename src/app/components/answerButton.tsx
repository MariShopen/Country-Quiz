import React, { ComponentProps } from "react";
import Image from "next/image"; // Import Next.js Image component
import RightIcon from "./img/Check_round_fill.svg";
import WrongIcon from "../../../public/img/Close_round_fill.svg";

export type ButtonProps = ComponentProps<"button"> & {
  isClicked?: boolean;
  icon?: string;
  rightAnswer: string;
};

export default function AnswerButton({
  className,
  children,
  onClick,
  isClicked,
  disabled,
  icon,
  rightAnswer,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${isClicked ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2" : "bg-purple3"}
      ${disabled ? "bg-purple3" : "hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2"}
      text-graybg font-semibold w-64 h-20 m-3 text-xl rounded-xl flex flex-row justify-center items-center
      ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
      {isClicked && rightAnswer === children && (
        <Image
          className="ml-2"
          src={RightIcon}
          alt="Icon"
          width={20}
          height={20}
        />
      )}
      {isClicked && rightAnswer !== children && (
        <Image
          className="ml-2"
          src={WrongIcon}
          alt="Icon"
          width={20}
          height={20}
        />
      )}
    </button>
  );
}

//  ${disabled ? "bg-purple3" : "hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2"}

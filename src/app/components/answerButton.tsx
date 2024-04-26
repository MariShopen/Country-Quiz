import React, { ComponentProps } from "react";
import Image from "next/image"; // Import Next.js Image component
import RightIcon from "./img/Check_round_fill.svg";
import WrongIcon from "../../../public/img/Close_round_fill.svg";

export type ButtonProps = ComponentProps<"button"> & {
  isClicked?: boolean;
  icon?: string;
  isCorrect: boolean;
  disabled: boolean;
  isAnswered: boolean;
  isUserAnswerCorrect: boolean;
};

export default function AnswerButton({
  className,
  children,
  onClick,
  isClicked,
  disabled,
  icon,
  isCorrect,
  isAnswered,
  isUserAnswerCorrect,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${isClicked || isUserAnswerCorrect ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2" : "bg-purple3"}
      ${disabled ? "bg-purple3" : "hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2"}
      text-graybg font-semibold w-64 h-20 m-3 text-xl rounded-xl flex flex-row justify-center items-center
      ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
      {isClicked && isCorrect && (
        <Image
          className="ml-2"
          src={RightIcon}
          alt="Icon"
          width={20}
          height={20}
        />
      )}
      {isClicked && !isCorrect && (
        <Image
          className="ml-2"
          src={WrongIcon}
          alt="Icon"
          width={20}
          height={20}
        />
      )}
      {(!isClicked && isCorrect && disabled && (
        <Image
          className="ml-2"
          src={RightIcon}
          alt="Icon"
          width={20}
          height={20}
        />
      )) ||
        (isAnswered && isCorrect && (
          <Image
            className="ml-2"
            src={RightIcon}
            alt="Icon"
            width={20}
            height={20}
          />
        ))}
      {isAnswered && isUserAnswerCorrect && !isCorrect && (
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

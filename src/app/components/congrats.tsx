import React from "react";
import Image from "next/image"; // Import Next.js Image component
import CongratsIcon from "./img/congrats.svg";

export type CongratsProps = {
  totalAnswered: number;
};

const Congrats: React.FC<CongratsProps> = ({ totalAnswered }) => {
  return (
    <div className="flex justify-around flex-col w-[400px] h-[400px] bg-purple2 rounded-xl">
      <div className="flex flex-col items-center">
        <Image
          className="mb-4"
          src={CongratsIcon}
          alt="Icon"
          width={349}
          height={107}
        />
        <div className="text-graybg text-2xl font-semibol mb-4">
          Congrats! You completed the quiz
        </div>
        <div className="mb-4 text-graybg text-l font-semibold">{`You answer ${totalAnswered}/10 correctly`}</div>
        <button
          className="bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-graybg 
      text-xl font-semibold w-60 h-16 m-5 rounded-xl flex flex-row justify-center items-center"
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default Congrats;

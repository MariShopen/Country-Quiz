import React, { useState } from "react";
import AnswerButton from "./app/components/answerButton";

type Options = {
  correct: any;
  incorrect: any[];
  all: any[];
};

type QuestionComponentProps = {
  question: string;
  options: Options;
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [answerDone, setAnswerDone] = useState<boolean>(false);

  const handleAnswerClick = (country: string) => () => {
    setSelectedCountry(country);
    setAnswerDone(true);
  };

  return (
    <>
      <div className="selected-question mt-4">
        {/* //вопросы открываются по клику */}
        {question && (
          <div className="text-graybg text-2xl font-semibold">{question}</div>
        )}
      </div>
      <div className="answers w-2/3 h-1/2 text-graybg flex flex-wrap items-center justify-center content-center ">
        {/* //варианты ответов */}
        {question &&
          options.all.map((country) => (
            <AnswerButton
              key={country}
              className="button"
              onClick={handleAnswerClick(country)}
              isClicked={selectedCountry === country}
              disabled={answerDone}
            >
              {answerDone ? "1" : "0"} {country}
            </AnswerButton>
          ))}
      </div>
    </>
  );
};

export default QuestionComponent;

import React, { useState } from "react";
import AnswerButton from "./components/answerButton";
import { Options } from "./page";

type QuestionComponentProps = {
  question: string;
  options: Options;
  answered: boolean;
  handleUserAnswer: (answer: any) => void;
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  answered,
  handleUserAnswer,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [answerDone, setAnswerDone] = useState<boolean>(false);

  const handleAnswerClick = (country: string) => () => {
    setSelectedCountry(country);
    setAnswerDone(true);
    handleUserAnswer(country);
  };

  return (
    <div className="selected-question-with-answers flex flex-col items-center justify-center h-3/4">
      <div className="selected-question">
        {/* //вопросы открываются по клику */}
        {question && (
          <div className="text-graybg text-2xl font-semibold mb-10">
            {question}
          </div>
        )}
      </div>
      <div className="answers w-2/3 h-1/2 text-graybg flex flex-wrap items-center justify-center content-center mb-10 ">
        {/* //варианты ответов */}
        {question &&
          options.all.map((country) => (
            <AnswerButton
              key={country}
              className="button"
              onClick={handleAnswerClick(country)}
              isClicked={selectedCountry === country}
              disabled={options.disabled}
              isCorrect={options.correct === country}
              isAnswered={answered}
              isUserAnswerCorrect={options.answered === country}
            >
              {country}
            </AnswerButton>
          ))}
      </div>
    </div>
  );
};

export default QuestionComponent;

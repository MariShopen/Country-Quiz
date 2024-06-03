"use client";
import React, { useEffect, useReducer, useState } from "react";
import "./globals.css";
import QuestionComponent from "./oneQuestion";
import Congrats from "./components/congrats";
import QuestionButton from "./components/questionButton";

export type Options = {
  correct: string;
  incorrect: any[];
  all: any[];
  answered: string | undefined;
  disabled: boolean;
};

type Question = {
  question: string;
  options: Options;
};

let totalAnswered: number = 0;
let totalCorrectAnswered: number = 0;

// function of random shuffle countries
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateIncorrectAnswers = (
  capitals: string[],
  correctAnswer: string
) => {
  const incorrectAnswers: string[] = [];
  while (incorrectAnswers.length < 3) {
    const randomIndex = Math.floor(Math.random() * capitals.length);
    const randomCapital = capitals[randomIndex];
    if (
      randomCapital !== correctAnswer &&
      !incorrectAnswers.includes(randomCapital)
    ) {
      incorrectAnswers.push(randomCapital);
    }
  }
  return incorrectAnswers;
};

export default function Home() {
  const [selectedQuestion, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  // const [_hui, trigger] = useReducer((i) => i + 1, 0);

  const handleQuestionClick = (question: any) => {
    setQuestion(question);
  };

  let isCompleted =
    quizQuestions.filter((question) => question.options.answered != null)
      .length == 10;

  const handleUserAnswer = (answer: any) => {
    selectedQuestion ? (selectedQuestion.options.answered = answer) : undefined;
    selectedQuestion ? (selectedQuestion.options.disabled = true) : false;
    if (selectedQuestion?.options.disabled === true) totalAnswered += 1;
    if (
      selectedQuestion?.options.answered === selectedQuestion?.options.correct
    )
      totalCorrectAnswered += 1;
    // trigger();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const countryNames = jsonData.map(
          (country: any) => country.name.common
        );
        // const shuffledCapitals = shuffle(capitals);

        const selectedquestions = shuffle(jsonData);
        const generatedQuizQuestions = selectedquestions
          .slice(0, 10)
          .map((country: any) => {
            const correctAnswer = country.name.common;
            const incorrectAnswers = generateIncorrectAnswers(
              countryNames,
              correctAnswer
            );
            const allAnswers = shuffle([correctAnswer, ...incorrectAnswers]);

            const question: string = `In which country is ${country.capital} the capital?`;
            const options: Options = {
              correct: correctAnswer,
              incorrect: incorrectAnswers,
              all: allAnswers,
              answered: undefined,
              disabled: false,
            };

            return { question, options };
          });

        setQuizQuestions(generatedQuizQuestions);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-w-full min-h-full h-screen items-center justify-center bg-graybg ">
      <div className="flex items-center justify-center w-[1280px] h-[720px] bg-bg-image">
        {totalAnswered !== 10 ? (
          <div className="flex items-center justify-around flex-col w-2/3 h-2/3 bg-purple2 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="text-fontColor font-bold mt-10">Country Quiz</div>
              <div className="question-buttons flex flex-row justify-center">
                {/* //кнопки рисуются disabled, пока вопросы не загрузились */}
                {Array.from({ length: 10 })
                  .fill(undefined)
                  .map((_, i) => (
                    <>
                      {isLoading ? (
                        <button className=" disabled:opacity-50 w-12 h-12 rounded-full text-fontColor bg-purple3 m-2 text-xl font-semibold">
                          {i + 1}
                        </button>
                      ) : (
                        <QuestionButton
                          key={selectedQuestion?.question}
                          isActive={
                            selectedQuestion === quizQuestions[i] ||
                            quizQuestions[i]?.options.answered != undefined
                          }
                          disabled={selectedQuestion?.options.disabled || false}
                          onClick={() => handleQuestionClick(quizQuestions[i])}
                        >
                          {i + 1}
                        </QuestionButton>
                        // <button
                        //   className={`w-12 h-12 rounded-full text-graybg m-2 text-xl font-semibold
                        //   hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2
                        //   ${
                        //     selectedQuestion?.options.disabled
                        //       ? "bg-gradient-to-r from-gradientColor1 to-gradientColor2"
                        //       : "bg-purple3"
                        //   }`}
                        //   onClick={() => handleQuestionClick(quizQuestions[i])}
                        // >
                        //   {i + 1}
                        // </button>
                      )}
                    </>
                  ))}
              </div>
            </div>
            {selectedQuestion ? (
              <QuestionComponent
                key={selectedQuestion.question}
                answered={selectedQuestion?.options.answered != undefined}
                question={selectedQuestion.question}
                options={selectedQuestion.options}
                handleUserAnswer={handleUserAnswer}
              />
            ) : (
              <div className="h-3/4"></div>
            )}
          </div>
        ) : (
          <Congrats correctAnswered={totalCorrectAnswered} />
        )}
      </div>
    </main>
  );
}

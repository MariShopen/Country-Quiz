"use client";
import React, { useEffect, useReducer, useState } from "react";
import "./globals.css";
import QuestionComponent from "./QuestionComponent";
import Congrats from "./components/congrats";
import QuestionButton from "./components/questionButton";
import { countries } from "./countries";

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

// function of random shuffle countries
const shuffle = <T extends unknown[]>(array: T): T => {
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

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/independent?status=true&fields=name,capital"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonData = await response.json();
    const countryNames = jsonData.map((country: any) => country.name.common);
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

        const question = `In which country is ${country.capital} the capital?`;
        const options: Options = {
          correct: correctAnswer,
          incorrect: incorrectAnswers,
          all: allAnswers,
          answered: undefined,
          disabled: false,
        };

        return { question, options };
      });
    return generatedQuizQuestions;
  } catch (error) {
    alert("Произошла ошибка");
  }
};

export default function Home() {
  const [questionId, setQuestionId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  const selectedQuestion = quizQuestions[questionId];

  const handleQuestionClick = (question: number) => {
    setQuestionId(question);
  };

  let isCompleted =
    quizQuestions.filter((question) => question.options.answered != null)
      .length == 10;

  let correctAnswered = quizQuestions.filter(
    (question) => question.options.answered === question.options.correct
  ).length;

  const handleUserAnswer = (answer: any) => {
    const newQuizQuestions = quizQuestions.map((question, id) => {
      if (id === questionId) {
        return {
          ...question,
          options: {
            ...question.options,
            answered: answer,
            disabled: true,
          },
        };
      }
      return question;
    });
    setQuizQuestions(newQuizQuestions);
  };

  const handleRestart = async () => {
    let questions = await fetchData();
    setQuizQuestions(questions);
    setIsLoading(false);
    setQuestionId(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if api is working
        const response = await fetch(
          "https://restcountries.com/v3.1/independent?status=true&fields=name,capital"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const countryNames = jsonData.map(
          (country: any) => country.name.common
        );

        //if api doesn't work
        // const jsonData = countries;
        // const countryNames = jsonData.map((country) => country.name);

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

            const question = `In which country is ${country.capital} the capital?`;
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-w-full min-h-full h-screen items-center justify-center bg-graybg ">
      <div className="flex items-center justify-center w-[1280px] h-[720px] bg-bg-image">
        {!isCompleted ? (
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
                          key={selectedQuestion.question}
                          isActive={
                            questionId === i ||
                            quizQuestions[i]?.options.answered != undefined
                          }
                          // disabled={selectedQuestion?.options.disabled || false}
                          onClick={() => handleQuestionClick(i)}
                        >
                          {i + 1}
                        </QuestionButton>
                      )}
                    </>
                  ))}
              </div>
            </div>
            {selectedQuestion != null ? (
              <QuestionComponent
                key={selectedQuestion.question}
                question={selectedQuestion.question}
                options={selectedQuestion.options}
                handleUserAnswer={handleUserAnswer}
              />
            ) : (
              <div className="h-3/4"></div>
            )}
          </div>
        ) : (
          <Congrats
            correctAnswered={correctAnswered}
            onRestart={handleRestart}
          />
        )}
      </div>
    </main>
  );
}

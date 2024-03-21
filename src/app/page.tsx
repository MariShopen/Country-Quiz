"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";

// function of random shuffle countries
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const shuffledData = shuffle(jsonData);
        setCountries(shuffledData);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const countries10 = countries.slice(0, 10);

  return (
    <main className="flex min-w-full min-h-full h-screen items-center justify-center bg-graybg ">
      <div className="flex items-center justify-center w-[1280px] h-[720px] bg-bg-image">
        <div className="flex items-center justify-around flex-col w-2/3 h-2/3 bg-purple2 rounded-xl">
          <div className="text-fontColor font-bold">Country Quiz</div>
          <div className="flex flex-col items-center">
            <div className="question-buttons flex flex-row justify-center">
              {/* {isLoading ? (
                <button>lkjgkdnkjdfb</button>
              ) : (
                countries10.map((country, index) => (
                  <button
                    className="w-12 h-12 rounded-full text-graybg bg-gradient-to-r from-gradientColor1 to-gradientColor2 m-4 text-xl font-semibold"
                    key={index}
                    onClick={() => handleQuestionClick(country.capital)}
                  >
                    {index + 1}
                  </button>
                ))
              )} */}
              {Array.from({ length: 10 })
                .fill(undefined)
                .map((_, i) => (
                  <>
                    {isLoading ? (
                      <button className=" disabled:opacity-50 w-12 h-12 rounded-full text-fontColor bg-purple3 m-4 text-xl font-semibold">
                        {i + 1}
                      </button>
                    ) : (
                      <button
                        className="w-12 h-12 rounded-full text-graybg bg-purple3 hover:bg-gradient-to-r from-gradientColor1 to-gradientColor2 m-4 text-xl font-semibold"
                        onClick={() =>
                          handleQuestionClick(countries10[i].capital)
                        }
                      >
                        {i + 1}
                      </button>
                    )}
                  </>
                ))}
            </div>
            <div className="selected-question">
              {selectedQuestion && (
                <div className="text-graybg text-2xl font-semibold">{`In which country is ${selectedQuestion} the capital?`}</div>
              )}
            </div>
          </div>
          <div className="text-graybg">answers</div>
        </div>
      </div>
    </main>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/ui/components/Button";
import { OptionList } from "./OptionList";
import { formatTime } from "../utils/formatTime";
import { Result } from "./Result";
import {
  playCorrectAnswer,
  playWrongAnswer,
  playQuizEnd,
} from "../utils/playSound";
import { csvToJson } from "../utils/csvToJson";
import { useRecoilValue } from "recoil";
import { quizState } from "@/app/states";

const TIME_LIMIT = 60; // 1 minute per question

export const Quiz = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [quizQuestions, setQuizQuestions]: any = useState([]);

  const [timePassed, setTimePassed] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const useQuizState = useRecoilValue(quizState);
  const [results, setResults] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    secondsUsed: 0,
  });

  const fetchData = async (sheetId?: string, sheetName?: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const e = await fetch(url);
    const res: any = await e.text();
    return res;
  };

  const getData = async (type?: string | null, id?: string) => {
    const sheetName: any = type;
    const sheetId = id;
    const _data = await fetchData(sheetId, sheetName);

    const data = csvToJson(_data as any);

    const formatData = data?.map((_data: any) => {
      return {
        ..._data,
        options: _data?.options?.split("/"),
      };
    });

    setQuizQuestions(formatData);
  };

  useEffect(() => {
    const { type, id }: any = useQuizState;
    getData(type, id);
  }, [quizState]);

  const setupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimePassed((prevTimePassed) =>
        prevTimePassed > TIME_LIMIT ? TIME_LIMIT : prevTimePassed + 1
      );
    }, 1000);
  };

  useEffect(() => {
    if (quizFinished) return;

    setupTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizFinished]);

  useEffect(() => {
    if (quizFinished) return;

    if (timePassed > TIME_LIMIT) {
      // The time limit has been reached for this question
      // So the answerr will be considered wrong

      // Update results
      if (selectedAnswerIndex === -1) {
        setResults((prev) => ({
          ...prev,
          secondsUsed: prev.secondsUsed + TIME_LIMIT,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
      }

      handleNextQuestion();
      // Restart timer
      setTimePassed(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePassed]);

  const handleNextQuestion = () => {
    // Reset selected answer
    setSelectedAnswerIndex(-1);

    // Check if quiz finished
    if (activeQuestion + 1 >= quizQuestions.length) {
      console.log("Quiz finished!");
      playQuizEnd();
      setQuizFinished(true);
      return;
    }

    // Set next question
    setActiveQuestion((prev) => prev + 1);

    // Reset timer
    setupTimer();
    setTimePassed(0);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    //  Stop timer
    clearInterval(timerRef.current!);
    setSelectedAnswerIndex(answerIndex);

    // Check if answer is correct
    const correctAnswer = quizQuestions[activeQuestion]?.correctAnswer;
    const selectedAnswer = quizQuestions[activeQuestion]?.options[answerIndex];

    if (correctAnswer === selectedAnswer) {
      console.log("Correct answer!");
      playCorrectAnswer();
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        correctAnswers: prev.correctAnswers + 1,
      }));

      setIsCorrectAnswer(true);
    } else {
      console.log("Wrong answer!");
      playWrongAnswer();
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      setIsCorrectAnswer(false);
    }
  };

  if (quizQuestions?.length < 1) {
    return <div>Loading.....</div>;
  }

  const { question, options } = quizQuestions[activeQuestion] || {};
  const numberOfQuestions = quizQuestions.length;

  if (quizFinished) {
    return <Result results={results} totalQuestions={quizQuestions.length} />;
  }

  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#007bff",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#ffffff",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="flex justify-center w-full h-full p-5"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col text-black font-bold text-[32px] text-center w-full">
        <h1 className="text-base font-bold text-brand-cerulean-blue">
          QuizApp
        </h1>
        <div className="w-full py-4 mt-6 mb-1 border rounded-2xl border-brand-light-gray px-7">
          <h3 className="text-sm font-medium text-black">
            Question {activeQuestion + 1} / {numberOfQuestions}
          </h3>

          <div
            key={activeQuestion}
            className="flex justify-center items-center w-full mt-[18px]"
          >
            {/* Start time */}
            <span className="text-xs font-normal text-brand-mountain-mist">
              {formatTime(timePassed)}
            </span>

            {/* Bar */}
            <div className="relative flex-1 h-3 bg-[#F0F0F0] mx-1 rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-brand-cerulean-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${(timePassed / TIME_LIMIT) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            {/* End time */}
            <span className="text-xs font-normal text-brand-mountain-mist">
              {formatTime(TIME_LIMIT)}
            </span>
          </div>

          <h4 className="text-brand-midnight font-medium text-base mt-[34px]">
            {question}
          </h4>
        </div>

        <OptionList
          activeQuestion={quizQuestions[activeQuestion]}
          options={options}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={handleSelectAnswer}
          isCorrectAnswer={isCorrectAnswer}
        />

        <div className="z-10 w-full mt-auto">
          <Button
            disabled={selectedAnswerIndex === -1}
            block
            size="small"
            className="hover:bg-blue-600"
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

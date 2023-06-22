"use client";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Button } from "@/app/_ui/components/Button";

import confettiAnimation from "@/ui/assets/animations/confetti.json";
import { DonutChart } from "./DonutChart";

interface ResultProps {
  results: {
    correctAnswers: number;
    wrongAnswers: number;
    secondsUsed: number;
  };
  totalQuestions: number;
}
export const Result = ({ results, totalQuestions }: ResultProps) => {
  const { correctAnswers, wrongAnswers, secondsUsed } = results;

  const handleRetry = () => {
    // Restart quiz
    window.location.reload();
  };

  return (
    <motion.div
      key={"result"}
      variants={{
        initial: {
          background: "#007bff",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#007bff",
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
        <h1 className="text-base font-bold text-white">Shan Dictionary Quiz</h1>

        {/* Result Box */}
        <div className="flex flex-col items-center flex-1 px-2 mt-6 bg-white border border-brand-light-gray rounded-2xl py-7 ">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            autoplay={true}
            style={{ width: "170px", height: "170px" }}
          />
          <h3 className="text-brand-midnight text-[32px] font-medium leading-9 mt-4">
            Congratulations!
          </h3>
          <p className="mt-2 text-xl font-normal text-brand-midnight">
            You scored
          </p>
          <span className="text-brand-midnight font-medium text-[40px]">
            {`${correctAnswers}/${totalQuestions}`}
          </span>
          <p className="mt-1 text-sm font-normal text-brand-midnight">
            correct answers
          </p>

          {/* Charts */}
          <div className="flex items-center mt-4 space-x-4">
            <DonutChart
              className="w-36 h-36"
              total={60 * totalQuestions}
              used={secondsUsed}
              type={"time"}
              data={[
                {
                  label: "Time Used",
                  value: secondsUsed,
                  color: "#374CB7",
                },
                {
                  label: "Time Left",
                  value: 60 * totalQuestions - secondsUsed,
                  color: "#F0F0F0",
                },
              ]}
            />

            <DonutChart
              className="w-36 h-36"
              type={"questions"}
              total={totalQuestions}
              used={correctAnswers}
              data={[
                {
                  label: "Correct",
                  value: correctAnswers,
                  color: "#56C490",
                },
                {
                  label: "Wrong",
                  value: wrongAnswers,
                  color: "#e65f5c",
                },
              ]}
            />
          </div>
        </div>

        {/* Retry Button */}
        <div className="mt-auto">
          <Button size="small" block className="mt-6" onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

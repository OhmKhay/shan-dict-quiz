"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "@/ui/icons/CheckCircle";
import { importantToKnow } from "@/ui/content/content";
import { Button } from "./Button";
import { categories } from "@/app/data/category";
import UnCheckIcon from "../icons/UnCheckCircle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { quizState } from "@/app/states";

interface IntroProps {
  onGetStartedClick: () => void;
}

export const Intro = ({ onGetStartedClick }: IntroProps) => {
  const useQuizState = useRecoilValue(quizState);
  const [quizType, setQuizType]: any = useState(useQuizState || null);
  const setQuizState = useSetRecoilState(quizState);

  return (
    <div className="flex flex-col w-full px-5 py-8 mx-auto overflow-hidden lg:max-w-4xl">
      <Image
        src="/quiz.webp"
        width={203}
        height={363}
        className="absolute opacity-[0.8] -bottom-0 left-0 z-0 object-cover pointer-events-none w-[12.5rem] h-[12.5rem] lg:w-[15.375rem] lg:h-[230px]"
        alt="Doodles Illustration"
      />

      <div className="z-10 flex flex-col items-center flex-1 w-full">
        <h1 className="text-brand-cerulean-blue font-bold text-[32px] sm:text-4xl">
          Shan Dictionary - Quiz
        </h1>

        <h3 className="text-black font-bold text-2xl mt-[51.55px] sm:text-3xl">
          Things to keep in mind before beginning:
        </h3>

        <div className="flex flex-col items-start mt-5 space-y-5 sm:mt-10">
          {importantToKnow.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle />
              <p className="text-sm font-normal text-brand-storm-dust sm:text-xl">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-black text-center mx-auto font-bold text-2xl mt-[51.55px] sm:text-3xl">
        Before starting, please choose your quiz type:
      </h3>

      {categories?.map((data: any) => {
        return (
          <div
            className="flex items-center  my-[1.2rem] space-y-2"
            key={data?.id}
            onClick={() => {
              setQuizType(data);
            }}
          >
            <div className="flex items-center space-x-2">
              {quizType?.id === data?.id ? <CheckCircle /> : <UnCheckIcon />}
              <p className="text-sm font-normal text-brand-storm-dust sm:text-xl">
                {data?.name}
              </p>
            </div>
          </div>
        );
      })}

      <Button
        className="z-10 mt-[1.25rem] w-full hover:bg-blue-600"
        block
        size={"small"}
        disabled={quizType ? false : true}
        onClick={() => {
          setQuizState(quizType);
          onGetStartedClick();
        }}
      >{`Let's Get Started`}</Button>
    </div>
  );
};

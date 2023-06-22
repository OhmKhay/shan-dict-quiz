"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "@/ui/icons/CheckCircle";
import { importantToKnow } from "@/ui/content/content";
import { Button } from "./Button";
// import { categories } from "@/app/data/category";
import UnCheckIcon from "../icons/UnCheckCircle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { quizState } from "@/app/states";
import { csvToJson } from "../utils/csvToJson";
import Loading from "../Loading";

interface IntroProps {
  onGetStartedClick: () => void;
}

export const Intro = ({ onGetStartedClick }: IntroProps) => {
  const useQuizState = useRecoilValue(quizState);
  const [categories, setCategories]: any = useState([]);
  const [quizType, setQuizType]: any = useState(useQuizState || null);
  const setQuizState = useSetRecoilState(quizState);

  const fetchData = async (sheetId?: string, sheetName?: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const e = await fetch(url);
    const res: any = await e.text();
    return res;
  };

  const getCategoryList = async () => {
    const sheetName = "quiz-list";
    const sheetId = "1bsizaguXNnUHiJFSjUVyi-Qg2CZ0T6o8PUKBdI5zlnM";
    const _data = await fetchData(sheetId, sheetName);

    const data = csvToJson(_data as any);
    setCategories(data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <div className="flex flex-col w-full px-5 py-8 mx-auto overflow-hidden lg:max-w-4xl">
      {/* <Image
        src="/quiz.webp"
        width={203}
        height={363}
        className="absolute opacity-[0.8] -bottom-0 left-0 z-0 object-cover pointer-events-none w-[12.5rem] h-[12.5rem] lg:w-[15.375rem] lg:h-[230px]"
        alt="Doodles Illustration"
      /> */}

      <div className="z-10 flex flex-col items-center flex-1 w-full">
        <h1 className="text-brand-cerulean-blue font-bold text-[1.8rem] sm:text-4xl">
          Shan Dictionary Quiz
        </h1>

        <h3 className="text-black font-bold text-2xl mt-[2rem] sm:text-3xl">
          Things to keep in mind before start:
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
      <h3 className="text-black md:text-center font-bold text-2xl mt-[2rem] sm:text-3xl">
        Before starting, please choose your quiz type:
      </h3>

      {categories?.length > 0 ? (
        categories?.map((data: any) => {
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
                  {data?.label}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-[50%] overflow-hidden">
          <Loading />
        </div>
      )}

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

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Countdown } from "@/ui/components/Countdown";
import { Intro } from "@/ui/components/Intro";
import { Quiz } from "@/ui/components/Quiz";
import { RecoilRoot } from "recoil";
import { csvToJson } from "./_ui/utils/csvToJson";

const Home = ({ categories }: any) => {
  const [displayView, setDisplayView] = useState("intro");

  return (
    <main className="flex flex-col w-full overflow-hidden h-viewport">
      <RecoilRoot>
        <AnimatePresence mode="wait">
          {
            {
              intro: (
                <Intro
                  categories={categories}
                  onGetStartedClick={() => {
                    setDisplayView("countdown");
                  }}
                />
              ),
              countdown: (
                <Countdown
                  onGoClick={() => {
                    setDisplayView("quiz");
                  }}
                />
              ),
              quiz: <Quiz />,
            }[displayView]
          }
        </AnimatePresence>
      </RecoilRoot>
    </main>
  );
};

export default Home;

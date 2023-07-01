"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Countdown } from "@/ui/components/Countdown";
import { Intro } from "@/ui/components/Intro";
import { Quiz } from "@/ui/components/Quiz";
import { RecoilRoot, useRecoilValue } from "recoil";
import Footer from "./_ui/Footer";

const Home = ({ categories }: any) => {
  const [displayView, setDisplayView] = useState("intro");

  return (
    <main className={`flex flex-col w-full h-full`}>
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

        <Footer />
      </RecoilRoot>
    </main>
  );
};

export default Home;

"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/ui/hooks/useCountdown";

interface CountdownProps {
  onGoClick: () => void;
}

export const Countdown = ({ onGoClick }: CountdownProps) => {
  const countdown = useCountdown(3);

  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#007bee",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#007bff",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="flex items-center justify-center w-full h-full px-5 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-white font-bold text-[32px]">
        <h1>Shan Dictionary Quiz</h1>
        <p className="mt-[116px]">Your quiz starts in</p>
        <div className="flex justify-center items-center mt-[38px] rounded-full border-8 border-white w-[196px] h-[196px] bg-transparent">
          {countdown !== 0 ? (
            <span className="text-[118px]">{countdown}</span>
          ) : (
            <span className="text-[88px] cursor-pointer" onClick={onGoClick}>
              GO
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

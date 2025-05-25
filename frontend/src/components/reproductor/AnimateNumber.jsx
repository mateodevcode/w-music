"use client";
import { useEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

const AnimateNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("00:00");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(formatTime(latest));
      },
    });

    return controls.stop;
  }, [value]);

  return <span>{display}</span>;
};
export default AnimateNumber;

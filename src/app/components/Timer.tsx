"use client";
import { useEffect, useState } from "react";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";

export default function Timer({ time }: { time: number }) {
  const [timeStatus, setTimeStatus] = useState(time * 60);
  const [statusBar, setStatusBar] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive && timeStatus > 0) {
      const timeout = setInterval(() => {
        setTimeStatus((time) => time - 1);
        setStatusBar(timeStatus - 1);
      }, 1000);

      return () => clearInterval(timeout);
    }
    if (timeStatus === 0) {
      setIsActive(false);
      setTimeStatus(time * 60);
    }
  }, [timeStatus, isActive]);

  const getTime = (time: number) => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="flex flex-col items-center text-gray-700">
      <span className="font-bold text-6xl">{getTime(timeStatus)}</span>
      <span className="w-12 h-6 mt-4 mb-10 flex justify-center" onClick={() => setIsActive((current) => !current)}>
        {!isActive ? <PlayIcon width={64} height={64} /> : <PauseIcon width={64} height={64} />}
      </span>
    </div>
  );
}

"use client";

import useTimersStore from "@/utils/timers-store";
import { useEffect } from "react";

const TimerComponent = () => {
  const {
    timers,
    addTimer,
    removeTimer,
    duration,
    tickTimers,
    setTotalDuration,
  } = useTimersStore();

  useEffect(() => {

    const interval = setInterval(() => {
      timers.forEach((timer) => {
        if (timer.isRunning) {
          tickTimers(timer.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, tickTimers]);

  const handleAddTimer = () => {
    const totalDurationInSeconds =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds * 1;

    console.log("totalDurationInSeconds log : ", totalDurationInSeconds);

    const newTimer = {
      id: Date.now(),
      hrs: duration.hours,
      min: duration.minutes,
      sec: duration.seconds,
      name: "je suis un FAKE timer",
      isRunning: true,
      startTime: Date.now(),
      duration: totalDurationInSeconds,
    };

    setTotalDuration(totalDurationInSeconds);
    addTimer(newTimer);

  };

  const handleRemoveTimer = (timer) => {
    removeTimer(timer);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={handleAddTimer}
          className="bg-yellow-500 hover:bg-lime-400 text-sm rounded-md mt-4 py-1 px-2 text-stone-950 font-semibold max-w-fit mb-10 self-end"
        >
          AddTimer
        </button>
        <ul className="w-64">
          {timers.map((timer) => (
            <li
              className="text-white mb-4 border border-1 border-stone-700 rounded-md"
              key={timer.id}
            >
              <div className="flex flex-col items-center text-center gap-4"></div>
              <div placeholder="entrez un nom pour votre timer" className="flex flex-col w-full text-center p-2">
                
              </div>
              <div className="flex flex-col w-full text-center p-2">
                {Math.floor(timer.duration / 3600)}:{Math.floor((timer.duration % 3600) / 60)}:
                {Math.floor(timer.duration % 60)}
                {console.log("timer log : ", timer.hours, timer.min, timer.sec)}
              </div>
              <div></div>
              <button
                className="flex flex-col w-full justify-between p-2"
                onClick={() => handleRemoveTimer(timer)}
              >
                Remove Timer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TimerComponent;

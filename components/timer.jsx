"use client";

import useTimersStore from "@/utils/timers-store";
import { useEffect } from "react";
import { Play, Pause, RotateCcw, X, Pencil } from "lucide-react";

const TimerComponent = () => {
  const {
    timers,
    addTimer,
    removeTimer,
    duration,
    tickTimers,
    setDurationInSeconds,
    pauseTimer,
    restartTimer,
    resetTimer,
    initialDuration,
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
      initialisation: initialDuration,
      initialHrs: initialDuration.hours,
      initialMin: initialDuration.minutes,
      initialSec: initialDuration.seconds,
      hrs: duration.hours,
      min: duration.minutes,
      sec: duration.seconds,
      name: "je suis un FAKE timer",
      isRunning: true,
      startTime: Date.now(),
      duration: totalDurationInSeconds,
    };

    setDurationInSeconds(totalDurationInSeconds);
    addTimer(newTimer);
  };

  const handleRemoveTimer = (timer) => {
    removeTimer(timer);
  };

  const handlePauseTimer = (timerId) => {
    pauseTimer(timerId);
  };

  const handleRestartTimer = (timerId) => {
    restartTimer(timerId);
  };

  const handleResetTimer = (timerId) => {
    resetTimer(timerId);
  };

  const leadingZero = (num) => num.toString().padStart(2, "0");

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
              className="flex flex-col justify-center text-stone-300 mb-4 h-64 border border-1 border-yellow-400 rounded-full p-4 px-8"
              key={timer.id}
            >
              <div className="flex flex-col items-center text-center gap-4"></div>
              <input
                placeholder="timer !"
                className="flex flex-col w-full border-b border-stone-600 mb-4 max-w-sm italic text-center bg-transparent text-sm placeholder:text-stone-400 text-yellow-400/75 focus:outline-none"
              ></input>
              <div className="flex flex-col items-center w-full text-center content-center p-2">
                <div className="flex flex-row">
                <div>{leadingZero(Math.floor(timer.duration / 3600))}</div>
                <div className="mr-2">h</div>
                <div>
                  {leadingZero(Math.floor((timer.duration % 3600) / 60))}
                </div>
                <div className="mr-2">m</div>
                {leadingZero(Math.floor(timer.duration % 60))}
                <div>s</div>
                </div>
              </div>
              <div className="flex flex-col items-center font-extralight text-sm">
                {leadingZero(timer.initialHrs)}:{leadingZero(timer.initialMin)}:
                {leadingZero(timer.initialSec)}
              </div>

              <div className="flex flex-row justify-between px-10 mt-4">
                <X
                  size={32}
                  color="#991b1b"
                  className="border border-red-600/75 rounded-full p-2 "
                  onClick={() => handleRemoveTimer(timer)}
                />
                <div>
                  {timer.duration <= 0 ? (
                    <RotateCcw
                      size={32}
                      color="#eab308"
                      className="border border-yellow-400/75 rounded-full p-2 "
                      onClick={() => handleResetTimer(timer.id)}
                    />
                  ) : timer.isRunning ? (
                    <Pause
                      size={32}
                      color="#d97706"
                      className="border border-amber-600 rounded-full p-2 "
                      onClick={() => handlePauseTimer(timer.id)}
                    />
                  ) : (
                    <Play
                      size={32}
                      color="#4d7c0f"
                      className="border border-lime-400/50 rounded-full p-2 "
                      onClick={() => handleRestartTimer(timer.id)}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TimerComponent;

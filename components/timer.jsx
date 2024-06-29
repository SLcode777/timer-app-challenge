"use client";

import useTimersStore from "@/utils/timers-store";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, X } from "lucide-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const TimerComponent = () => {
  const {
    timers,
    addTimer,
    removeTimer,
    duration,
    tickTimers,
    setDurationInSeconds,
    pauseTimer,
    unpauseTimer,
    resetTimer,
    initialDuration,
    setTimerName,
  } = useTimersStore();

  const audioRefOver = useRef(null);

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
      initialHrs: duration.hours,
      initialMin: duration.minutes,
      initialSec: duration.seconds,
      hrs: duration.hours,
      min: duration.minutes,
      sec: duration.seconds,
      name: "timer !",
      isRunning: true,
      startTime: Date.now(),
      duration: totalDurationInSeconds,
    };

    console.log("timer duration in seconds : ", newTimer.duration);
    setDurationInSeconds(totalDurationInSeconds);
    addTimer(newTimer);
    console.log("timer ajouté ! id : ", newTimer.id);
  };

  const handleRemoveTimer = (timer) => {
    removeTimer(timer);
    console.log("timer deleted", timer.id);
  };

  const handlePauseTimer = (timerId) => {
    console.log("timer paused", timerId);
    pauseTimer(timerId);
  };

  const handleUnpauseTimer = (timerId) => {
    console.log("timer unpaused", timerId);
    unpauseTimer(timerId);
  };

  const handleResetTimer = (timerId) => {
    console.log("reset du timer", timerId);
    resetTimer(timerId);
    console.log("le timer a été reset", timerId);
  };

  const handleSetTimerName = (timerId, newName) => {
    setTimerName(timerId, newName)
  }

  const leadingZero = (num) => num.toString().padStart(2, "0");

  const [key, setKey] = useState(0);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <audio ref={audioRefOver} src="/timesup.wav" preload="auto"></audio>
        <button
          onClick={handleAddTimer}
          className="bg-yellow-500 hover:bg-lime-400 text-sm rounded-md mt-4 py-1 px-2 text-stone-950 font-semibold max-w-fit mb-10 self-end"
        >
          AddTimer
        </button>

        <ul className="w-64">
          {timers.map((timer) => (
            <li
              className="flex flex-col justify-center text-stone-300 mb-4 h-64  rounded-full p-4 px-8"
              key={timer.id}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <CountdownCircleTimer
                  key={key}
                  isPlaying={timer.isRunning}
                  duration={
                    timer.initialHrs * 3600 +
                    timer.initialMin * 60 +
                    timer.initialSec
                  }
                  initialRemainingTime={timer.duration}
                  colors={["#F7B801"]}
                  size={250}
                  strokeWidth={3}
                  strokeLinecap="butt"
                  trailStrokeWidth={1}
                  trailColor="#57534e"
                  onComplete={() => {
                    audioRefOver.current.play();
                    return { shouldRepeat: false };
                  }}
                >
                  {({ remainingTime }) => (
                    <div className="flex flex-col items-center">
                      <input
                        placeholder={timer.name}
                        className="flex flex-col w-full border-b border-stone-600 mb-4 max-w-sm italic text-center bg-transparent text-sm placeholder:text-stone-400 text-yellow-400/75 focus:outline-none"
                        onChange={(e) => handleSetTimerName(timer.id, e.target.value)}
                      ></input>
                      <div className="flex flex-row">
                        <div className="text-2xl">
                          {leadingZero(Math.floor(remainingTime / 3600))}h
                        </div>
                        <div className="text-2xl">
                          {leadingZero(Math.floor((remainingTime % 3600) / 60))}
                          m
                        </div>
                        <div className="text-2xl">
                          {leadingZero(remainingTime % 60)}s
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 items-center font-extralight text-sm">
                        {leadingZero(timer.initialHrs)}:
                        {leadingZero(timer.initialMin)}:
                        {leadingZero(timer.initialSec)}
                      </div>
                      <div className="flex flex-row gap-20 mt-8">
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
                              onClick={() => {setKey((prevKey) => prevKey + 1);
                                handleResetTimer(timer.id);
                              
                              }}
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
                              onClick={() => handleUnpauseTimer(timer.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CountdownCircleTimer>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TimerComponent;

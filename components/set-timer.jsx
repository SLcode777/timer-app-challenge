"use client";

import { SetTimerBox } from "./set-timer-box.jsx";

export function SetTimer() {
  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 ">
          <SetTimerBox min="00" max="99" tag="hrs" />

          <div className="flex flex-row items-center">
            <p className="text-stone-400">:</p>
          </div>
          <SetTimerBox value="00" min="00" max="60" tag="min" />

          <div className="flex flex-row items-center">
            <p className="text-stone-400">:</p>
          </div>
          <SetTimerBox value="00" min="00" max="60" tag="sec" />
        </div>
        <button className="bg-yellow-500 hover:bg-lime-400 text-sm rounded-md mt-2 py-1 px-2 text-stone-950 font-semibold max-w-fit self-end">
          Add Timer
        </button>
      </div>
    </>
  );
}

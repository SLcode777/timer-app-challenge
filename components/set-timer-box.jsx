"use client";

export function SetTimerBox({ value, min, max, tag, onChange }) {
  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <>
      <div className="flex flex-col bg-stone-900 rounded-md p-2 items-center ">
        <input
          placeholder="00"
          // value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          type="number"
          min={min}
          max={max}
          className="selection:bg-stone-700 rounded focus:ring-1 max-w-14 bg-transparent text-center text-4xl text-stone-400 font-mono placeholder:text-stone-400"
        ></input>
        <div className="text-yellow-500">{tag}</div>
      </div>
    </>
  );
}

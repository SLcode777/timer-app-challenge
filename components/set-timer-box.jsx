export function SetTimerBox({value, min, max, tag}) {
  const handleFocus = (event) => {
    event.target.select();
  };


  return (
    <>
      <div className="flex flex-col bg-stone-900 rounded-md p-2 items-center ">
        <input
          placeholder="00"
          onFocus={handleFocus}
          type="number"
          min={min}
          max={max}
          className="selection:bg-stone-700 rounded focus:ring-1 max-w-14 bg-transparent text-center text-4xl text-stone-400 font-mono"
        ></input>
        <div className="text-yellow-500">{tag}</div>
      </div>
    </>
  );
}

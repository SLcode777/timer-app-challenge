"use client";

export function SetTimer() {

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 ">
          <div className="flex flex-col bg-stone-900 rounded-md p-2 items-center ">
            <input onFocus={handleFocus} type="number" min="00" max="99" className="selection:bg-stone-700 rounded focus:ring-1 max-w-14 bg-transparent text-center text-4xl text-stone-400 font-mono"></input>
            <div className="text-yellow-500">hrs</div>
          </div>
          <div className="flex flex-row items-center">

          <p className="text-stone-400">:</p>
          </div>
          <div className="flex flex-col bg-stone-900 rounded-md p-2 items-center ">
          <input onFocus={handleFocus} type="number"  min="00" max="60" className="selection:bg-stone-700 rounded focus:ring-12  max-w-14 bg-transparent text-center text-4xl text-stone-400 font-mono"></input>
            <div className="text-yellow-500">min</div>
          </div>
          <div className="flex flex-row items-center">

          <p className="text-stone-400">:</p>
          </div>
          <div className="flex flex-col bg-stone-900 rounded-md p-2 items-center ">
          <input onFocus={handleFocus} type="number"  min="00" max="60" className="selection:bg-stone-700 rounded focus:ring-12 max-w-14 bg-transparent text-center text-4xl text-stone-400 font-mono"></input>
            <div className="text-yellow-500">sec</div>
          </div>
        </div>
        <button className="bg-yellow-500 hover:bg-lime-400 text-sm rounded-md mt-2 py-1 px-2 text-stone-950 font-semibold max-w-fit self-end">Add Timer</button>
      </div>
    </>
  );

}
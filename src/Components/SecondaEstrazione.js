import React, { useState, useRef } from "react";
import firstkit from "../assets/imgs/firstKit.png";
import gkKit from "../assets/imgs/gkKit.png";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import random from "random";

const SecondaEstrazione = () => {
  const [refState, setRefState] = useState("imprevisto");

  
  const ref = useRef(null);
  
  const handleRefState = () => {
    setRefState(parseInt(ref.current.value));
  };
  
  const [secondExtractedNumber, setSecondExtractedNumber] = useState(null);
  
  const randomNumber = () => {
    setSecondExtractedNumber(random.int(1, refState));
  };
  const extractedPlayer = [secondExtractedNumber]

  return (
    <section className="flex h-auto w-full items-center justify-between gap-2 rounded-md border-2 border-gray-300/20 p-2">
      <div className="flex h-fit flex-col items-center justify-around gap-2 rounded-lg px-2">
        <div className="flex w-full flex-col items-center justify-around">
          <input
            onChange={handleRefState}
            ref={ref}
            type="number"
            id="input-estrazione-giocatore"
            className="w-full h-8 flex-1 appearance-none text-center rounded-lg border-gray-300 bg-white p-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-700"
            name="randomPlayerNum"
            placeholder="Su quanti giocatori?"
          />
        </div>
        <button
          type="button"
          onClick={() => randomNumber()}
          className="h-8 p-2 w-full flex items-center justify-center rounded-lg bg-purple-700 px-4 text-center text-sm font-semibold text-gray-100 shadow-md transition duration-200 ease-in hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-[--clr-ter] focus:ring-offset-2 focus:ring-offset-sky-800"
        >
          Estrai
        </button>
      </div>
        <>
          <div
            className={`flex h-64 w-1/2 flex-col items-center justify-center overflow-hidden rounded bg-contain bg-center bg-no-repeat p-6 transition-all ${secondExtractedNumber ? "visible" : "invisible"}`}
            style={{
              backgroundImage:
                secondExtractedNumber === 1
                  ? `url(${gkKit})`
                  : `url(${firstkit})`,
            }}
          >
            <span className="mb-4 block font-['Anton'] text-7xl font-bold text-gray-300">
              {secondExtractedNumber}
            </span>
          </div>
          <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer}/>
        </>
    </section>
  );
};

export default SecondaEstrazione;

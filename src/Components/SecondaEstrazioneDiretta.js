/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import firstkit from "../assets/imgs/firstKit.png";
import gkKit from "../assets/imgs/gkKit.png";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";

const SecondaEstrazioneDiretta = (props) => {
  const { numbExtrPlayer, extractedPlayer } = props;  

  return (
    <section
      id="secEstrDiretta"
      className="flex h-fit w-full flex-col items-center justify-around rounded-md border-2 border-gray-300/20 px-1 mb-12 md:min-h-[40%] xl:px-6"
    >
      <h4 className="my-1  xl:self-start text-xs font-bold uppercase text-gray-300 md:my-0 md:mb-1 md:text-lg">
        {numbExtrPlayer === 1 ? "Giocatore estratto" : "Giocatori estratti"}
      </h4>
      <main
        id="mainSecEstrDiretta"
        className="flex h-full w-full items-center justify-between xl:gap-2"
      >
        <div
          id="extractedPlayers"
          className="flex h-full flex-wrap items-center justify-end rounded-lg w-3/4 xl:w-1/2 md:flex-nowrap gap-2 xl:gap-4"
        >
          {extractedPlayer?.map((player, i) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center overflow-hidden rounded bg-contain bg-center bg-no-repeat p-8 transition-all md:h-4/5 w-full"
                style={{
                  backgroundImage:
                    player === 1 ? `url(${gkKit})` : `url(${firstkit})`,
                }}
              >
                <span
                  className={`block pb-5 font-['Anton'] text-4xl font-bold text-gray-300 ${numbExtrPlayer > 3 ? "pb-3 text-6xl xl:text-5xl" : "text-9xl xl:text-7xl"}`}
                >
                  {player}
                </span>
              </div>
            );
          })}
        </div>
        <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
      </main>
    </section>
  );
};

export default SecondaEstrazioneDiretta;

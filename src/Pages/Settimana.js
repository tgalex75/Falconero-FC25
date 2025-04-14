import React, { useState } from "react";
import Dado from "../Components/Dado";
import rnd from "random-weight";
import datiSettimana from "../Data/datiSettimana";
import LayoutBase from "../Components/LayoutBase";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    const estrattoSettimana1 = rnd(datiSettimana, (i) => i.weight);
    const estrattoSettimana2 = rnd(datiSettimana, (i) => i.weight);
    setCasuale([estrattoSettimana1, estrattoSettimana2]);
  };

  const titoloH1 = "Peggiore della Settimana n. ";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center xl:flex-row p-2 xl-p-0">
      {!casuale && (
        <h2 className="andika-regular-italic flex h-full items-center justify-center text-5xl italic">
          Buzzzz it!...
        </h2>
      )}
      {casuale?.map((array, i) => (
        <LayoutBase
          key={i}
          titoloH1={titoloH1 + parseInt(i + 1)}
          id={array.id}
          isImprev={array.isImprev}
          casuale={array}
        >
          <>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                array.isImprev
                  ? "text-7xl font-extrabold uppercase md:relative md:top-2 md:flex-1 xl:text-5xl"
                  : "hidden"
              }
            >
              {array.isImprev && "IMPREVISTO"}
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold uppercase md:absolute md:flex-1 xl:text-4xl"
            >
              {array.title}
            </h3>
            <p className="andika-regular left-1/2 top-2/3 mt-4 -translate-x-1/2 -translate-y-1/2 text-3xl md:absolute md:flex-1 xl:text-xl">
              {array.description}
            </p>
          </>
        </LayoutBase>
      ))}

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </div>
  );
};

export default Settimana;

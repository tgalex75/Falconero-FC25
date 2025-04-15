import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  bonusCessioni,
  bonusTrofei,
  malusAcquisti,
  trendPrestazioni,
  piazzamentoCampionato,
} from "../Data/datiSaldoPunti";
import { GrPowerReset } from "react-icons/gr";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";

const SaldoPunti = () => {
  const [data, setData] = useState([]);
  const [isOver32, setIsOver32] = useState(false);
  const [isSerieMinore, setIsSerieMinore] = useState(false);
  const isSerieMinoreOver = isOver32 && isSerieMinore;

  const checkisOver = () => {
    setIsOver32(!isOver32);
  };
  const checkisSerieMinore = () => {
    setIsSerieMinore(!isSerieMinore);
  };

  const fetchSaldo = async () => {
    let { data: saldo_punti, error } = await supabase
      .from("saldo-punti")
      .select("*");
    setData(saldo_punti ? saldo_punti[0] : console.log(error));
  };

  const { id, punti } = data ? data : {};

  const updateSaldoPunti = async (val) => {
    const { error } = await supabase
      .from("saldo-punti")
      .update({
        punti: punti + val,
      })
      .eq("id", id)
      .select();
    error && console.log("error: ", error);
    fetchSaldo();
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  const resetPunti = async () => {
    const { error } = await supabase
      .from("saldo-punti")
      .update({ punti: 10 })
      .eq("id", id)
      .select();
    error && console.log("error: ", error);
    fetchSaldo();
  };

  const bonusMalusStyle =
    "flex flex-col cursor-pointer text-center text-base p-2 border-none hover:border items-center justify-center rounded-xl hover:text-black hover:bg-[--clr-ter]";

  const mappedCessioni = bonusCessioni.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.icon}
      {el.nome}
    </div>
  ));
  const mappedAcquisti = malusAcquisti.map((el) => (
    <div
      key={el.id}
      onClick={() =>
        isSerieMinoreOver
          ? updateSaldoPunti(el.valoreSerieMinoreOver)
          : updateSaldoPunti(
              isOver32
                ? el.valoreOver
                : isSerieMinore
                  ? el.valoreSerieMinore
                  : el.valoreUnder,
            )
      }
      className={bonusMalusStyle}
    >
      {isSerieMinoreOver
        ? el.nomeSerieMinoriOver
        : isOver32
          ? el.nomeOver
          : isSerieMinore
            ? el.nomeSerieMinori
            : el.nomeUnder}
    </div>
  ));
  const mappedTrofei = bonusTrofei.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.icon}
      {el.nome}
    </div>
  ));
  const mappedTrend = trendPrestazioni.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.icon}
      {el.nome}
    </div>
  ));
  const mappedPiazzamento = piazzamentoCampionato.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.icon}
      {el.nome}
    </div>
  ));

  return (
    <>
      <main
        id="saldo-punti"
        className="flex h-full w-full select-none flex-col items-center justify-between gap-2 bg-black/30 py-4"
      >
        <section
          id="saldoPunti"
          className="hover:bg-700/80 flex h-1/4 w-full flex-col items-center justify-around font-bold"
        >
          <h1 className="relative">Saldo Punti</h1>
          <h3 className="text-9xl xl:text-7xl font-black italic">{punti}</h3>
          <div className="absolute right-2 mt-12 flex flex-col items-center justify-around p-2">
            <GrPowerReset
              size={32}
              className="peer cursor-pointer hover:animate-spin hover:stroke-purple-700 active:scale-150"
              onClick={resetPunti}
            />
            <span className="invisible text-purple-700 transition-all duration-500 ease-in-out peer-hover:visible">
              Reset{" "}
            </span>
          </div>
        </section>
        {/* CESSIONI */}

        <section
          id="acquistiCessioni"
          className="flex xl:flex-row flex-col h-1/4 xl:h-1/4 w-full items-center gap-1 text-lg font-bold"
        >
          <div className="flex h-full w-full xl:w-1/2 flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30">
            <h2 className="inline-flex items-center text-2xl xl:text-lg">
              Cessioni Mercato
              <LuArrowUpWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center">
              {mappedCessioni}
            </div>
          </div>
          <div className="relative flex h-full w-full xl:w-1/2 flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30">
            <h2 className="inline-flex items-center text-2xl xl:text-lg">
              Acquisti Mercato
              <LuArrowDownWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center">
              {mappedAcquisti}
            </div>
            {/* TOGGLE SERIE MINORE */}
            <div className="absolute left-1 top-1 flex items-center gap-2 p-4 xl:p-2 text-xs">
              <label
                htmlFor="switch-link"
                className={`cursor-pointer font-sans antialiased ${isSerieMinore && "border-b-2 border-b-[--clr-ter] text-[--clr-ter]"}`}
              >
                Serie Minore<span>{isSerieMinore ? " " : "?"}</span>
              </label>
              <input
                id="switch-link"
                type="checkbox"
                checked={isSerieMinore}
                onChange={checkisSerieMinore}
                className="relative inline-block h-4 w-8 cursor-pointer appearance-none rounded-full before:absolute before:left-0 before:top-0 before:inline-block before:h-full before:w-full before:rounded-full before:bg-stone-400 before:transition-colors before:duration-200 before:ease-in after:absolute after:left-0 after:top-2/4 after:h-6 after:w-6 after:-translate-y-2/4 after:rounded-full after:border after:border-stone-500 after:bg-stone-600 after:transition-all after:duration-200 after:ease-in checked:before:bg-stone-200 checked:after:translate-x-1/2 checked:after:border-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:checked:after:bg-purple-600"
              />
            </div>
            {/* TOGGLE OVER 32 */}
            <div className="absolute right-1 top-1 flex items-center gap-2 p-4 xl:p-2 text-xs">
              <label
                htmlFor="switch-link"
                className={`cursor-pointer font-sans antialiased ${isOver32 && "border-b-2 border-b-[--clr-ter] text-[--clr-ter]"}`}
              >
                Over 32<span>{isOver32 ? " " : "?"}</span>
              </label>
              <input
                id="switch-link"
                type="checkbox"
                checked={isOver32}
                onChange={checkisOver}
                className="relative inline-block h-4 w-8 cursor-pointer appearance-none rounded-full before:absolute before:left-0 before:top-0 before:inline-block before:h-full before:w-full before:rounded-full before:bg-stone-400 before:transition-colors before:duration-200 before:ease-in after:absolute after:left-0 after:top-2/4 after:h-6 after:w-6 after:-translate-y-2/4 after:rounded-full after:border after:border-stone-500 after:bg-stone-600 after:transition-all after:duration-200 after:ease-in checked:before:bg-stone-200 checked:after:translate-x-1/2 checked:after:border-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:checked:after:bg-purple-600"
              />
            </div>
          </div>
        </section>

        {/* COMPETIZIONI */}

        <section
          id="trendPrestazioni"
          className="flex h-1/5 xl:h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-1 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-2xl xl:text-lg">Trend delle Prestazioni</h2>
          <div className="grid h-auto w-full grid-cols-2 justify-center">
            {mappedTrend}
          </div>
        </section>
        <section
          id="piazzamentoCampionato"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-1 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-2xl xl:text-lg">Risultati Campionato</h2>
          <div className="grid h-auto w-full grid-cols-3 xl:grid-cols-9 items-center justify-center">
            {mappedPiazzamento}
          </div>
        </section>
        <section
          id="bonusTrofei"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-1 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-2xl xl:text-lg">Trofei Conquistati</h2>
          <div className="grid h-auto w-full grid-cols-5 justify-center">
            {mappedTrofei}
          </div>
        </section>
      </main>
    </>
  );
};

export default SaldoPunti;

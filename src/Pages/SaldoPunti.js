import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { bonusCessioni, bonusTrofei, malusAcquisti, trendPrestazioni, piazzamentoCampionato } from "../Data/datiSaldoPunti";
import { GrPowerReset } from "react-icons/gr";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";

const SaldoPunti = () => {
  const [data, setData] = useState([]);

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
        punti: punti + val > 0 ? punti + val : 0,
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
    const { data, error } = await supabase
      .from("saldo-punti")
      .update({ punti: 10 })
      .eq("id", id)
      .select();
    data ? console.log("data: ", data) : console.log("error: ", error);
    fetchSaldo();
  };

  const bonusMalusStyle =
    "flex flex-col cursor-pointer text-lg py-2 border-none hover:border items-center justify-center rounded-xl hover:text-black hover:bg-[--clr-ter]";

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
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.nome}
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
        className="flex h-full w-full flex-col items-center justify-between gap-1 bg-black/30 px-4 py-6 select-none"
      >
        <h1 className="relative pb-4">Saldo Punti </h1>
        <section
          id="saldoPunti"
          className="hover:bg-700/80 flex h-1/4 w-full flex-col items-center justify-around font-bold"
        >
          <h3 className="text-9xl font-black italic">{punti}</h3>
          <div className="absolute right-2 flex flex-col items-center p-2">
            <GrPowerReset
              size={36}
              className="peer cursor-pointer hover:animate-spin hover:stroke-purple-700 active:scale-150"
              onClick={resetPunti}
            />
            <span className="invisible text-purple-700 transition-all duration-500 ease-in-out peer-hover:visible">
              Reset{" "}
            </span>
          </div>
        </section>

        {/* COMPETIZIONI */}

        <section
          id="trendPrestazioni"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-2 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-xl">Trend delle Prestazioni</h2>
          <div className="grid h-auto w-full grid-cols-2 justify-center p-2">
            {mappedTrend}
          </div>
        </section>
        <section
          id="piazzamentoCampionato"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-2 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-xl">Piazzamento in Campionato</h2>
          <div className="grid h-auto w-full grid-cols-7 justify-center p-2">
            {mappedPiazzamento}
          </div>
        </section>
        <section
          id="bonusTrofei"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 p-2 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30"
        >
          <h2 className="text-xl">Trofei Conquistati</h2>
          <div className="grid h-auto w-full grid-cols-5 justify-center p-2">
            {mappedTrofei}
          </div>
        </section>

        {/* CESSIONI */}

        <section
          id="acquistiCessioni"
          className="flex h-1/4 w-full items-center gap-2 text-lg font-bold"
        >
          <div className="flex h-full w-1/2 flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30">
            <h2 className="inline-flex items-center text-xl">
              Cessioni Mercato
              <LuArrowUpWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center p-2">
              {mappedCessioni}
            </div>
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-purple-800/30">
            <h2 className="inline-flex items-center text-xl">
              Acquisti Mercato
              <LuArrowDownWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center p-2">
              {mappedAcquisti}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SaldoPunti;

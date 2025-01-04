import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { GrPowerReset } from "react-icons/gr";
import { LiaTrophySolid } from "react-icons/lia";
import { GiLaurelsTrophy, GiTrophyCup } from "react-icons/gi";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";
import { PiListBulletsBold } from "react-icons/pi";

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

  const bonusCompetizioni = [
    {
      id: "srn01",
      nome: "Serie Negativa -1",
      valore: -1,
      icon: <IoMdTrendingDown size={36} className="mb-1" />,
    },
    {
      id: "srp01",
      nome: "Serie Positiva +1",
      valore: 1,
      icon: <IoMdTrendingUp size={36} className="mb-1" />,
    },
    {
      id: "cmp01",
      nome: "Salvezza +5",
      valore: 5,
      icon: <PiListBulletsBold size={36} className="mb-1" />,
    },
    {
      id: "cmp02",
      nome: "Coppa Nazionale +10",
      valore: 10,
      icon: <GiTrophyCup size={32} className="mb-1" />,
    },
    {
      id: "cmp03",
      nome: "Scudetto +18",
      valore: 18,
      icon: <LiaTrophySolid size={36} className="mb-1" />,
    },
    {
      id: "cmp04",
      nome: "Coppa Europea +30",
      valore: 30,
      icon: <GiLaurelsTrophy size={36} className="mb-1" />,
    },
  ];
  const bonusCessioni = [
    {
      id: "c01",
      nome: "≥70 +1.5",
      valore: 1.5,
    },
    {
      id: "c02",
      nome: "≥75 +3",
      valore: 3,
    },
    {
      id: "c03",
      nome: "≥80 +4.5",
      valore: 4.5,
    },
    {
      id: "c04",
      nome: "≥85 +6",
      valore: 6,
    },
    {
      id: "c05",
      nome: "≥90 +7.5",
      valore: 7.5,
    },
  ];

  const malusAcquisti = [
    {
      id: "a03",
      nome: "≥70 -3",
      valore: -3,
    },
    {
      id: "a06",
      nome: "≥75 -6",
      valore: -6,
    },
    {
      id: "a09",
      nome: "≥80 -9",
      valore: -9,
    },
    {
      id: "a12",
      nome: "≥85 -12",
      valore: -12,
    },
    {
      id: "a15",
      nome: "≥90 -15",
      valore: -15,
    },
  ];

  const bonusMalusStyle =
    "flex flex-col cursor-pointer text-xl py-4 border-none hover:border items-center justify-center rounded-xl hover:bg-purple-700/60";

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
  const mappedCompetizioni = bonusCompetizioni.map((el) => (
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
        className="flex h-full w-full flex-col items-center justify-between gap-4 bg-black/30 px-4 py-6"
      >
        <h1 className="relative pb-4">Saldo Punti </h1>
        <section
          id="saldoPunti"
          className="hover:bg-700/80 flex h-1/4 w-full flex-col items-center justify-around font-bold"
        >
          <h2 className="text-xl">Attuale</h2>
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
          id="bonusCompetizioni"
          className="flex h-1/3 w-full flex-col items-center justify-around gap-2 rounded-xl border-2 border-purple-700/60 p-2 text-lg font-bold transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-black/30"
        >
          <h2 className="text-3xl">Competizioni</h2>
          <div className="grid h-auto w-full grid-cols-6 justify-center gap-2 p-2">
            {mappedCompetizioni}
          </div>
        </section>

        {/* CESSIONI */}

        <section
          id="acquistiCessioni"
          className="flex h-1/3 w-full items-center gap-4 text-lg font-bold"
        >
          <div className="flex h-full w-1/2 flex-col items-center justify-around gap-2 rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-black/30">
            <h2 className="inline-flex items-center text-3xl">
              Cessioni
              <LuArrowUpWideNarrow className="mx-3 inline-block" size={36} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center gap-2 p-2">
              {mappedCessioni}
            </div>
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-around rounded-xl border-2 border-purple-700/60 transition-all duration-300 ease-in-out hover:border-gray-200 hover:bg-black/30">
            <h2 className="inline-flex items-center text-3xl">
              Acquisti
              <LuArrowDownWideNarrow className="mx-3 inline-block" size={36} />
            </h2>
            <div className="grid h-auto w-full grid-cols-5 justify-center gap-2 p-2">
              {mappedAcquisti}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SaldoPunti;

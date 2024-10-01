import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const SaldoPunti = () => {
  const [data, setData] = useState([]);

  const fetchSaldo = async () => {
    let { data: saldo_punti, error } = await supabase
      .from("saldo-punti")
      .select("*");
    setData(saldo_punti ? saldo_punti[0] : console.log(error));
  };

  const {id, punti} = data ? data : {}

  const updateSaldoPunti = async (val) => {
    const { data, error } = await supabase
      .from("saldo-punti")
      .update({ punti: punti + val })
      .eq("id", id)
      .select();
      data ? console.log("data: ", data) : console.log("error: ", error);
  };

  useEffect(() => {
    fetchSaldo();
  }, [data]);

  const bonusCompetizioni = [
    {
      id: "cmp01",
      nome: "Promozione +10",
      valore: 10,
    },
    {
      id: "cmp02",
      nome: "Coppa Nazionale +10",
      valore: 10,
    },
    {
      id: "cmp03",
      nome: "Scudetto +15",
      valore: 15,
    },
    {
      id: "cmp04",
      nome: "Coppa Europea +20",
      valore: 20,
    },
  ];
  const bonusCessioni = [
    {
      id: "c01",
      nome: "≥70 +1",
      valore: 1,
    },
    {
      id: "c03",
      nome: "≥80 +3",
      valore: 3,
    },
    {
      id: "c05",
      nome: "≥90 +5",
      valore: 5,
    },
  ];

  const malusAcquisti = [
    {
      id: "a03",
      nome: "≥70 -3",
      valore: -3,
    },
    {
      id: "a09",
      nome: "≥80 -9",
      valore: -9,
    },
    {
      id: "a15",
      nome: "≥90 -15",
      valore: -15,
    },
  ];

  const mappedCessioni = bonusCessioni.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className="flex cursor-pointer items-center justify-center rounded-lg border"
    >
      {el.nome}
    </div>
  ));
  const mappedAcquisti = malusAcquisti.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className="flex cursor-pointer items-center justify-center rounded-lg border"
      >
      {el.nome}
    </div>
  ));
  const mappedCompetizioni = bonusCompetizioni.map((el) => (
    <div
    key={el.id}
    onClick={() => updateSaldoPunti(el.valore)}
    className="flex items-center justify-center rounded-lg border">
              {el.name}
            </div>
  ));

  return (
    <>
      <main
        id="saldo-punti"
        className="flex h-full w-full flex-col items-center justify-between gap-4 bg-black/30 py-4"
      >
        <h1 className="relative pb-4">Saldo Punti </h1>
        <section
          id="saldoPunti"
          className="flex h-1/4 w-full flex-col items-center gap-2 p-2 font-bold"
        >
          <h2 className="text-3xl">Punti Attuali</h2>
          <h3 className="text-8xl font-black">{punti}</h3>
        </section>
        <section
          id="bonusCompetizioni"
          className="flex h-full w-full flex-col items-center gap-2 border-t border-pink-500 p-2 font-bold"
        >
          <h2 className="text-3xl">Competizioni</h2>
          <div className="grid h-auto w-full grid-cols-4 justify-center gap-2 border p-2">
            {mappedCompetizioni}
          </div>
        </section>
        <section
          id="acquistiCessioni"
          className="flex h-full w-full flex-col items-center gap-2 border-t border-pink-500 p-2 font-bold"
        >
          <h2 className="text-3xl">Cessioni</h2>
          <div className="grid h-auto w-full grid-cols-3 justify-center gap-2 border p-2">
            {mappedCessioni}
          </div>
          <h2 className="text-3xl">Acquisti</h2>
          <div className="grid h-auto w-full grid-cols-3 justify-center gap-2 border p-2">
            {mappedAcquisti}
          </div>
        </section>
      </main>
    </>
  );
};

export default SaldoPunti;

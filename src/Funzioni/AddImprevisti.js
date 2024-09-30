import { db } from "../Data/db";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { isMobile } from "react-device-detect";
import { MdDeleteForever } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { DelImprevisti } from "./DelImprevisti";

export function AddImprevisti(props) {
  const { tipoImprevisto, registro } = props;

  const [refState, setRefState] = useState("imprevisto");

  const ref = useRef(null);

  const handleRefState = () => {
    setRefState(ref.current.value);
  };

  const disabledField = refState === "noImprevisto";
  const isListaSpeciali = tipoImprevisto === "speciali";
  const isListaSettimana = tipoImprevisto === "settimana";

  async function addImpr(data, e) {
    try {
      const id = await db[tipoImprevisto].add(
        isListaSpeciali
          ? {
              titolo: disabledField
                ? "NESSUN IMPREVISTO"
                : refState === "speciale"
                  ? "IMPREVISTO SPECIALE"
                  : data.titolo,
              descrizione: refState === "imprevisto" ? data.descrizione : "",
              isImprev: disabledField ? 0 : 1,
              ultEstrazione: disabledField ? 0 : parseInt(data.ultEstrazione),
              eliminaDopoEstrazione: parseInt(data?.eliminaDopoEstrazione),
            }
          : {
              titolo: disabledField
                ? "NESSUN IMPREVISTO"
                : refState === "speciale"
                  ? "IMPREVISTO SPECIALE"
                  : data.titolo,
              descrizione: refState === "imprevisto" ? data.descrizione : "",
              isImprev: disabledField ? 0 : 1,
              ultEstrazione: disabledField ? 0 : parseInt(data.ultEstrazione),
            },
      );
      console.log(id);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
    setRefState("imprevisto");
  }

  const {
    register: registerImprevisti,
    handleSubmit: handleSubmitImprevisti,
    formState: { errors: errorsImprevisti },
  } = useForm();

  return (
    <>
      {isMobile ? (
        <ul className="flex h-1/2 w-full flex-col gap-1 overflow-y-auto rounded-lg border p-2">
          <div className="flex min-h-8 items-center bg-gray-700/80 ps-2 text-[.5rem] font-bold uppercase italic leading-none">
            <div className="w-full">
              <span className="block w-full border-gray-300/20 bg-transparent p-1">
                Impr.S/N
              </span>
              <span className="block w-full border-gray-300/20 bg-transparent p-1">
                Titolo
              </span>
            </div>
            <div className="w-full">
              <span
                className={`border-gray-300/20 bg-transparent p-1 ${isListaSpeciali ? "inline-block w-1/2" : "block w-full"}`}
                style={isListaSettimana ? { visibility: "hidden" } : {}}
              >
                {isListaSpeciali ? "Ult.Estr." : "Ulteriore Estrazione"}
              </span>
              {isListaSpeciali && (
                <span className="w-1/2 border-gray-300/20 bg-transparent p-1">
                  El. Dopo Estr.
                </span>
              )}
              <span className="block w-full border-gray-300/20 bg-transparent p-1">
                Descrizione
              </span>
            </div>

            <MdClear size={42} className="mx-2" />
          </div>
          {registro?.map((el) => (
            <li
              key={el.id}
              className="flex h-12 gap-2 bg-gray-400/20 ps-2 text-[.6rem] font-semibold uppercase leading-none odd:bg-gray-700/20 hover:bg-[--clr-prim] hover:text-black"
            >
              <div className="flex w-full flex-col p-1">
                <span className="block h-full w-full bg-transparent">
                  {el.isImprev === 1 ? "SI" : "NO"}
                </span>
                <span className="block h-full w-full bg-transparent text-start ">
                  {el.titolo}
                </span>
              </div>
              <div className="flex w-full flex-col justify-around py-1">
                <div className="w-full h-full">
                  <span
                    className={`border-gray-300/20 bg-transparent p-1 ${isListaSpeciali ? "inline-block w-1/2" : "block w-full"}`}
                    style={isListaSettimana ? { visibility: "hidden" } : {}}
                  >
                    {el.ultEstrazione === 1 ? "SI" : "NO"}
                  </span>
                  {isListaSpeciali && (
                    <span className="inline w-1/2 border-gray-300/20 bg-transparent p-1 ms-1">
                      {el.eliminaDopoEstrazione === 1 ? "SI" : "NO"}
                    </span>
                  )}
                </div>
                <span className="block h-full w-full overflow-y-auto bg-transparent text-start">
                  {el.descrizione}
                </span>
              </div>
              <MdDeleteForever
                size={42}
                className="mx-2 cursor-pointer self-center transition-all hover:scale-125"
                onClick={() => DelImprevisti(tipoImprevisto, el.id)}
              />
            </li>
          ))}
        </ul>

        /* DESKTOP */
      ) : (
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto rounded-lg border p-2">
          <div className="flex min-h-4 items-center justify-between gap-2 bg-gray-700/80 ps-2 text-center text-xs font-bold uppercase italic">
            <span className="h-full w-1/6 border-gray-300/20 bg-transparent p-1">
              Imprevisto S/N
            </span>
            <span className="h-full w-1/6 border-gray-300/20 bg-transparent p-1 text-left">
              Titolo
            </span>
            <span className="h-full w-3/6 border-gray-300/20 bg-transparent p-1 text-left">
              Descrizione
            </span>
            <span
              className="h-full w-1/6 border-gray-300/20 bg-transparent p-1"
              style={isListaSettimana ? { visibility: "hidden" } : {}}
            >
              Ulteriore Estrazione
            </span>
            {isListaSpeciali && (
              <span
                className="h-full w-1/6 rounded bg-transparent p-1 font-semibold"
                style={isListaSettimana ? { visibility: "hidden" } : {}}
              >
                Elimina dopo Estrazione
              </span>
            )}

            <MdClear size={24} className="mx-2" />
          </div>
          {registro?.map((el) => (
            <li
              key={el.id}
              className="text-md flex min-h-4 items-center justify-between gap-2 bg-gray-700/20 ps-2 text-center uppercase font-semibold hover:bg-[--clr-prim] hover:text-black"
            >
              <span className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1 ">
                {el.isImprev === 1 ? "SI" : "NO"}
              </span>
              <span className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1 text-start">
                {el.titolo}
              </span>
              <span className="h-full w-3/6 overflow-auto rounded border border-gray-300/20 bg-transparent p-1 text-start">
                {el.descrizione}
              </span>
              <span
                className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1"
                style={isListaSettimana ? { visibility: "hidden" } : {}}
              >
                {el.ultEstrazione === 1 ? "SI" : "NO"}
              </span>
              {isListaSpeciali && (
                <span
                  className="h-full w-1/6 rounded border border-gray-300/20 bg-transparent p-1"
                  style={isListaSettimana ? { visibility: "hidden" } : {}}
                >
                  {el.eliminaDopoEstrazione === 1 ? "SI" : "NO"}
                </span>
              )}
              <MdDeleteForever
                size={24}
                className="mx-2 cursor-pointer transition-all hover:scale-125"
                onClick={() => DelImprevisti(tipoImprevisto, el.id)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Form "AGGIUNGI Imprevisti" */}

      <div className="flex w-full items-center px-1 pb-8">
        <form
          onSubmit={handleSubmitImprevisti(addImpr)}
          className="flex h-full w-full flex-col items-center justify-between gap-2 py-2 font-normal md:px-4"
        >
          <h3 className="text-center uppercase text-[--clr-prim]">
            Aggiungi il tuo imprevisto
          </h3>
          <label
            htmlFor="isImprev"
            className="flex  w-full items-center justify-center gap-2 md:w-1/3"
          >
            Cosa vuoi inserire?
            {errorsImprevisti.isImprev && (
              <span className="text-[--clr-prim]">
                Seleziona un tipo di imprevisto!
              </span>
            )}
            <select
              id="isImprev"
              name="isImprev"
              {...registerImprevisti("isImprev")}
              defaultChecked
              ref={ref}
              onChange={handleRefState}
              className="w-fit self-center rounded-md border p-1 text-xs font-semibold md:text-sm dark:border-gray-300/80 dark:bg-black/30 dark:text-gray-300 dark:placeholder-black/10 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="imprevisto">IMPREVISTO</option>
              <option
                className={`${isListaSpeciali && "hidden"}`}
                value="noImprevisto"
              >
                NESSUN IMPREVISTO
              </option>
              <option
                className={`${tipoImprevisto === "prepartita" || isListaSettimana ? "visible" : "hidden"}`}
                value="speciale"
              >
                IMPREVISTO SPECIALE
              </option>
            </select>
          </label>

          {/* TITOLO */}
          <section className="w-full rounded-md border p-1 md:flex md:p-2">
            <div className="w-full gap-2 md:flex md:w-1/2 md:flex-col">
              <label className="mb-2 flex flex-col gap-2 text-xs font-semibold md:my-1 md:flex-row md:gap-4 md:text-sm">
                Titolo Imprevisto
                {errorsImprevisti.titolo && (
                  <span className="mb-1 w-full self-start text-[--clr-prim] md:m-0 md:w-auto">
                    Il campo Titolo è obbligatorio - max 20 caratteri
                  </span>
                )}
              </label>
              {refState !== "speciale" ? (
                <input
                  name="titolo"
                  {...registerImprevisti("titolo", {
                    required: disabledField ? false : true,
                    maxLength: 20,
                  })}
                  disabled={disabledField}
                  className="block w-2/3 rounded p-1 text-xs font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black md:w-1/3 md:text-sm"
                  placeholder={
                    disabledField
                      ? "NESSUN IMPREVISTO"
                      : "Titolo dell'imprevisto"
                  }
                />
              ) : (
                <input
                  name="titolo"
                  {...registerImprevisti("titolo", {
                    required: false,
                    maxLength: 20,
                  })}
                  disabled
                  className="block w-2/3 self-start rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black md:w-1/3"
                  placeholder="IMPREVISTO SPECIALE"
                />
              )}
              <div
                className="flex flex-col items-center justify-around gap-2 py-1 md:flex-row md:py-2"
                style={isListaSettimana ? { visibility: "hidden" } : {}}
              >
                {/* ULTERIORE ESTRAZIONE */}

                <div className="flex items-center gap-1 py-1 text-xs md:gap-2 md:py-2 md:text-sm">
                  <label
                    htmlFor="ultEstrazione"
                    className="font-semibold text-gray-300 md:me-4"
                  >
                    Ulteriore estrazione necessaria dopo la prima?
                  </label>
                  <label htmlFor="ultEstrazioneYES">Sì</label>
                  <input
                    {...registerImprevisti("ultEstrazione")}
                    disabled={disabledField || refState === "speciale"}
                    id="ultEstrazioneYES"
                    name="ultEstrazione"
                    defaultChecked
                    type="radio"
                    value={1}
                    className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label htmlFor="ultEstrazioneNO">No</label>
                  <input
                    {...registerImprevisti("ultEstrazione")}
                    disabled={disabledField || refState === "speciale"}
                    id="ultEstrazioneNO"
                    name="ultEstrazione"
                    type="radio"
                    value={0}
                    className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>

                {/* ELIMINA VOCE */}

                {isListaSpeciali && (
                  <div className="flex items-center gap-1 py-1 text-xs md:gap-2 md:py-2 md:px-2 md:text-sm">
                    <label
                      htmlFor="eliminaDopoEstrazione"
                      className="font-semibold text-gray-300 md:me-4"
                    >
                      Vuoi eliminare la voce dopo l'estrazione?
                    </label>
                    <label htmlFor="eliminaDopoEstrazioneYES">Sì</label>
                    <input
                      {...registerImprevisti("eliminaDopoEstrazione")}
                      id="eliminaDopoEstrazioneYES"
                      name="eliminaDopoEstrazione"
                      defaultChecked
                      type="radio"
                      value={1}
                      className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label htmlFor="eliminaDopoEstrazioneNO">No</label>
                    <input
                      {...registerImprevisti("eliminaDopoEstrazione")}
                      id="eliminaDopoEstrazioneNO"
                      name="eliminaDopoEstrazione"
                      type="radio"
                      value={0}
                      className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIZIONE */}
            <div className="flex flex-col gap-2 text-xs md:w-1/2 md:text-sm">
              <label className="my-1 flex w-full items-center gap-4 self-start font-semibold">
                Descrizione Imprevisto
                {errorsImprevisti.descrizione && (
                  <span className="text-[--clr-prim]">
                    Il campo descrizione è obbligatorio
                  </span>
                )}
              </label>
              <textarea
                name="descrizione"
                {...registerImprevisti("descrizione", {
                  required:
                    disabledField || refState === "speciale" ? false : true,
                })}
                rows={isMobile ? 3 : 4}
                disabled={disabledField || refState === "speciale"}
                id="descrizione"
                placeholder="Descrizione dell'imprevisto"
                className="w-full rounded p-1 font-semibold text-black placeholder:italic"
              />
            </div>
          </section>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-700 py-1 font-semibold hover:bg-sky-600 md:w-1/3"
          >
            Salva ed Invia
          </button>
        </form>
      </div>
    </>
  );
}

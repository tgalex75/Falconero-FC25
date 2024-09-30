import { db } from "../Data/db";
import { useForm } from "react-hook-form";
import { isMobile } from "react-device-detect";
import { MdDeleteForever } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { DelImprevisti } from "./DelImprevisti";

export function AddImprIngaggi(props) {
  const { tipoImprevisto, registro } = props;

  async function addImpr(data, e) {
    try {
      const id = await db[tipoImprevisto].add({
        titolo: data.titolo,
        descrizione: data.descrizione,
        isImprev: parseInt(data.isImprev),
      });
      console.log(id, data);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  const {
    register: registerImprevisti,
    handleSubmit: handleSubmitImprevisti,
    formState: { errors: errorsImprevisti },
  } = useForm();

  return (
    <>
      <ul className="flex h-1/2 md:h-full w-full flex-col gap-1 overflow-y-auto rounded-lg border py-1 md:p-2">
        <div className="flex min-h-4 items-center justify-between bg-gray-700/80 py-1 text-center text-xs font-bold uppercase italic md:gap-2 md:ps-2">
          <span className="h-full min-w-fit border-gray-300/20 bg-transparent px-1 text-left">
            Imp.S/N
          </span>
          <span className="h-full w-16 border-gray-300/20 bg-transparent text-left md:w-1/3">
            Titolo
          </span>
          <span className="h-full w-48 border-gray-300/20 bg-transparent text-left md:w-2/3">
            Descrizione
          </span>
          <MdClear size={isMobile ? 18 : 24} className="me-2 md:mx-2" />
        </div>

        {/* LISTA MAPPATA */}

        {registro?.map((el) => (
          <li
            key={el.id}
            className="flex min-h-4 items-center justify-between gap-4 bg-gray-700/20 text-center text-xs font-normal hover:bg-[--clr-prim] hover:text-black md:gap-2 md:ps-2 md:text-base"
          >
            <span className="h-full min-w-fit rounded bg-transparent p-1 px-2 font-semibold uppercase md:w-14 md:border md:border-gray-300/20">
              {el.isImprev === 1 ? "SI" : "NO"}
            </span>
            <span className="h-full w-16 rounded bg-transparent p-1 text-start font-semibold uppercase md:w-1/3 md:border md:border-gray-300/20">
              {el.titolo}
            </span>
            <span className="h-full w-48 overflow-auto rounded bg-transparent p-1 text-start font-semibold md:w-2/3 md:border md:border-gray-300/20">
              {el.descrizione}
            </span>
            <MdDeleteForever
              size={isMobile ? 18 : 24}
              className="mx-2 cursor-pointer transition-all hover:scale-125"
              onClick={() => DelImprevisti(tipoImprevisto, el.id)}
            />
          </li>
        ))}
      </ul>

      {/* Form "AGGIUNGI Imprevisti" */}

      <div className="flex w-full items-center px-1 pb-8">
        <form
          onSubmit={handleSubmitImprevisti(addImpr)}
          className="flex h-full w-full flex-col items-center justify-between gap-2 py-2 font-normal md:px-4"
        >
          <h3 className="text-center uppercase text-[--clr-prim]">
            Aggiungi il tuo imprevisto
          </h3>

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
              <input
                name="titolo"
                {...registerImprevisti("titolo", {
                  required: true,
                  maxLength: 20,
                })}
                className="block w-2/3 rounded p-1 text-xs font-semibold uppercase text-black placeholder:normal-case placeholder:italic disabled:placeholder:text-black md:w-1/3 md:text-sm"
                placeholder="Titolo dell'imprevisto"
              />
              <div
            className="flex items-center gap-2 py-2 pe-2"
            style={
              tipoImprevisto === "settimana" ? { visibility: "hidden" } : {}
            }
          >
            <label
              htmlFor="isImprevTRUE"
              className="text-xs font-semibold text-gray-300 md:me-4 md:text-sm"
            >
              È un imprevisto?
            </label>
            <label htmlFor="isImprevTRUE">Sì</label>
            <input
              {...registerImprevisti("isImprev")}
              id="isImprevTRUE"
              name="isImprev"
              type="radio"
              value={1}
              className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="isImprevFALSE">No</label>
            <input
              {...registerImprevisti("isImprev")}
              id="isImprevFALSE"
              defaultChecked
              name="isImprev"
              type="radio"
              value={0}
              className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
          </div>
            </div>

            {/* DESCRIZIONE */}
            <div className="flex flex-col gap-2 md:w-1/2">
              <label className="my-2 flex flex-col gap-2 text-xs font-semibold md:flex-row md:gap-4 md:text-sm">
                Descrizione Imprevisto
                {errorsImprevisti.descrizione && (
                  <span className="mb-1 w-full self-start text-[--clr-prim] md:m-0 md:w-auto">
                    Il campo descrizione è obbligatorio
                  </span>
                )}
              </label>
              <textarea
                name="descrizione"
                {...registerImprevisti("descrizione", {
                  required: true,
                })}
                rows={isMobile ? 3 : 4}
                id="descrizione"
                placeholder="Descrizione dell'imprevisto"
                className="w-full rounded p-1 text-xs font-semibold text-black placeholder:italic md:text-sm"
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

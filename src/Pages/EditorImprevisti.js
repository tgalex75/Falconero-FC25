import { useRef } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { MdSend, MdClear } from "react-icons/md";
import { useForm } from "react-hook-form";
import useFetchData from "../Hooks/useFetchData";

const EditorImprevisti = () => {
  const { data, fetchRegistryList } = useFetchData("imprevisti");

  const aggiornaTitoloImprRef = useRef([]);
  const aggiornaDescImprRef = useRef([]);
  const aggiornaUltEstrImprRef = useRef([]);
  const aggiornaQtGiocatoriImprRef = useRef([]);
  const aggiornaTitRosaImprRef = useRef([]);

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("imprevisti")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchRegistryList();
  };

  const updateVociRegistro = async (
    element,
    refTitolo,
    refDescr,
    refUltEstr,
    refQtgiocat,
    refTitRosa,
  ) => {
    const { error } = await supabase
      .from("imprevisti")
      .update({
        titolo: refTitolo.toUpperCase(),
        descrizione: refDescr,
        ultEstrazione: refUltEstr,
        qtGiocatori: refQtgiocat,
        titolariRosa: refTitRosa,
      })
      .eq("id", element)
      .select();
    error && console.log(error);
    fetchRegistryList();
  };

  // LOGICA NUOVO IMPREVISTO

  const uploadNewImpr = async (objForm) => {
    const { titolo, descrizione, ultEstrazione, qtGiocatori, titolariRosa } =
      objForm;
    const { error } = await supabase
      .from("imprevisti")
      .insert([
        {
          titolo: titolo.toUpperCase(),
          descrizione: descrizione,
          ultEstrazione: ultEstrazione,
          qtGiocatori: parseInt(qtGiocatori),
          titolariRosa: parseInt(titolariRosa),
        },
      ])
      .select();
    console.log(error && console.log(error));
    fetchRegistryList();
  };

  const handleNewImpr = (objForm) => {
    uploadNewImpr(objForm);
  };

  /* FORM INSERIMENTO IMPREVISTI */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    handleNewImpr(data);
    //console.log(data);
    e.target.reset();
  };

  return (
    <section className="flex h-full w-full flex-col items-center gap-4 p-2 font-bold">
      <h1>Editor Imprevisti della Community</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full items-center justify-around overflow-hidden rounded-lg bg-black/50 px-2 text-gray-300 md:flex-col"
      >
        {/* Lista Imprevisti Attuale */}

        <div className="relative flex min-h-[60vh] xl:min-h-[40dvh] w-full flex-col items-center justify-center gap-2 p-1">
          <header className="flex w-full items-center justify-between p-1">
            <strong className="w-full text-end text-sm font-semibold text-[--clr-ter]">
              Numero imprevisti: {data.length}
            </strong>
          </header>
          <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto rounded-lg border p-1 xl:p-4">
            {data?.map((el) => (
              <li
                key={el.id}
                className="flex select-all items-center justify-between gap-2 bg-gray-700/20 ps-2 text-left text-sm font-normal hover:bg-gray-600/50"
              >
                <input
                  className="w-[25%] xl:w-[15%] select-all rounded border border-gray-300/20 bg-transparent p-1 pe-6 font-medium uppercase"
                  defaultValue={el.titolo}
                  ref={(element) =>
                    (aggiornaTitoloImprRef.current[el.id] = element)
                  }
                />
                <input
                  className="w-[65%] xl:w-[75%] rounded border border-gray-300/20 bg-transparent p-1 pe-6 font-medium"
                  defaultValue={el.descrizione}
                  ref={(element) =>
                    (aggiornaDescImprRef.current[el.id] = element)
                  }
                />
                <select
                  name="ultEstr"
                  id="ultEstr"
                  className="w-[5%] rounded border border-gray-300/20 bg-transparent p-1 pe-6 font-medium"
                  ref={(element) =>
                    (aggiornaUltEstrImprRef.current[el.id] = element)
                  }
                  defaultValue={el.ultEstrazione}
                >
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </select>
                <select
                  name="qtGioc"
                  id="qtGioc"
                  className="w-[5%] select-all rounded border border-gray-300/20 bg-transparent p-1 text-center font-medium uppercase"
                  defaultValue={el.qtGiocatori}
                  ref={(element) =>
                    (aggiornaQtGiocatoriImprRef.current[el.id] = element)
                  }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                <select
                  name="ultEstr"
                  id="ultEstr"
                  className="w-[5%] rounded border border-gray-300/20 bg-transparent p-1 text-center font-medium"
                  ref={(element) =>
                    (aggiornaTitRosaImprRef.current[el.id] = element)
                  }
                  defaultValue={el.titolariRosa}
                >
                  <option value={11}>11</option>
                  <option value={30}>30</option>
                </select>

                <MdSend
                  size={24}
                  className="cursor-pointer fill-gray-300 transition-all hover:scale-125 hover:fill-[--clr-ter]"
                  onClick={() =>
                    updateVociRegistro(
                      el.id,
                      aggiornaTitoloImprRef.current[el.id].value,
                      aggiornaDescImprRef.current[el.id].value,
                      aggiornaUltEstrImprRef.current[el.id].value,
                      aggiornaQtGiocatoriImprRef.current[el.id].value,
                      aggiornaTitRosaImprRef.current[el.id].value,
                    )
                  }
                />
                <MdClear
                  size={24}
                  className="mx-2 cursor-pointer fill-red-600 transition-all hover:scale-125 hover:fill-[--clr-ter]"
                  onClick={() => removeVociRegistro(el.id)}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Form "AGGIUNGI Imprevisti" */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col items-center justify-around xl:justify-between gap-2 rounded-md px-4 xl:py-2 py-8 font-normal"
        >
          <h3 className="text-center font-bold uppercase text-[--clr-ter]">
            Aggiungi imprevisto
          </h3>
          <div className="flex h-2/3 w-full items-start justify-between gap-2 px-2">
            <label className="my-1 flex w-full flex-col items-start gap-4 self-start text-sm font-semibold">
              Titolo Imprevisto
              {errors.titolo && (
                <span className="font-normal italic text-[--clr-ter]">
                  Il campo "Titolo" è obbligatorio - max 50 caratteri
                </span>
              )}
              <input
                name="titolo"
                {...register("titolo", { required: true, maxLength: 50 })}
                className="block w-2/3 self-start rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic"
                placeholder="Titolo dell'imprevisto"
              />
            </label>
            <label className="my-1 flex w-full flex-col items-start gap-4 self-start text-sm font-semibold">
              Descrizione Imprevisto
              {errors.descrizione && (
                <span className="font-normal italic text-[--clr-ter]">
                  Il campo "Descrizione" è obbligatorio
                </span>
              )}
              <textarea
                name="descrizione"
                {...register("descrizione", { required: true })}
                rows={3}
                id="descrizione"
                placeholder="Descrizione dell'imprevisto"
                className="w-full rounded p-1 text-sm font-semibold text-black placeholder:italic"
              />
            </label>
          </div>
          <div className="flex h-1/3 w-full items-start justify-between gap-2 px-2">
            <label
              htmlFor="ultEstrazione"
              className="my-1 ms-4 flex w-full items-start gap-2 self-start text-sm font-semibold"
            >
              Bisogna estrarre uno o più giocatori?
              {errors.ultEstrazione && (
                <span className="font-normal italic text-[--clr-ter]">
                  Il campo "estrazione giocatore" è obbligatorio
                </span>
              )}
              <label htmlFor="ultEstrazioneYES">Sì</label>
              <input
                {...register("ultEstrazione", { required: true })}
                id="ultEstrazioneYES"
                name="ultEstrazione"
                type="radio"
                value={true}
                className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-purple-600"
              />
              <label htmlFor="ultEstrazioneNO">No</label>
              <input
                {...register("ultEstrazione", { required: true })}
                id="ultEstrazioneNO"
                name="ultEstrazione"
                type="radio"
                value={false}
                className="ms-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 md:m-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-purple-600"
              />
            </label>
            <label
              htmlFor="qtGiocatori"
              className="my-1 ms-4 flex w-full items-start gap-2 self-start text-sm font-semibold"
            >
              Quanti giocatori saranno estratti?
              {errors.qtGiocatori && (
                <span className="font-normal italic text-[--clr-ter]">
                  Il campo "Quanti Giocatori" è obbligatorio - Inserisci un
                  numero da 0 a 10
                </span>
              )}
              <input
                {...register("qtGiocatori", {
                  required: true,
                  min: 0,
                  max: 10,
                })}
                id="qtGiocatori"
                name="qtGiocatori"
                type="number"
                placeholder="Quanti giocatori?"
                className="w-48 rounded p-1 text-sm font-semibold text-black placeholder:italic"
              />
            </label>
            <label
              htmlFor="qtGiocatori"
              className="my-1 ms-4 flex w-full items-start gap-2 self-start text-sm font-semibold"
            >
              Solo i Titolari o l'intera Rosa?
              {errors.titolariRosa && (
                <span className="font-normal italic text-[--clr-ter]">
                  Il campo "Titolari o intera rosa" è obbligatorio
                </span>
              )}
              <select
                {...register("titolariRosa", {
                  required: true,
                })}
                id="titolariRosa"
                name="titolariRosa"
                type="number"
                placeholder="Titolari o Intera rosa?"
                className="w-48 rounded p-1 text-sm font-semibold text-black placeholder:italic"
              >
                <option value={11}>Titolari</option>
                <option value={30}>Intera Rosa</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="w-2/3 xl:h-12 h-16 xl:w-1/3 rounded-lg bg-purple-700 py-1 font-semibold hover:bg-purple-600"
          >
            Salva ed Invia
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default EditorImprevisti;

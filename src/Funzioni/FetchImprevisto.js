import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import capitalize from "lodash.capitalize";
export default function FetchImprevisto(props) {


  const { titolo, descrizione, ultEstrazione, qtGiocatori, titolariRosa } =
    props;


  return (
    <section
      id="fetchImprevisto"
      className="border border-pink-400 flex h-full w-4/5 flex-col items-center justify-center gap-2"
    >
      <h3
        style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
        className="text-4xl font-extrabold uppercase"
      >
        {titolo && titolo}
      </h3>
      <p
        className={`andika-regular flex h-fit items-center justify-center overflow-y-auto px-4 scrollbar ${
          descrizione && descrizione.length > 200 ? "text-lg" : "text-2xl"
        }`}
      >
        {capitalize(descrizione)}
      </p>
      {ultEstrazione && (
        <SecondaEstrazioneDiretta
          numbExtrPlayer={qtGiocatori}
          baseEstrazione={titolariRosa}
        />
      )}
      
    </section>
  );
}

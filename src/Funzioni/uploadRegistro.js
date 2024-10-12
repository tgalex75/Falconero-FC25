import { Link } from "react-router-dom";

export const uploadRegistro = (inputRef, addFunct, title) => {
  return (
    <div className="flex w-full flex-col mb-6 items-center md:w-3/4">
      <label
        htmlFor="nome-giocatore"
        className="mb-1 inline-block text-xs text-gray-300 md:text-sm"
      >
        Giocatore da iscrivere sul <Link to="/registro-giocatori" className="hover:text-purple-700">registro</Link>
      </label>
      <div className="flex h-1/2 w-1/2 items-center justify-between gap-1">
        <input
          ref={inputRef}
          type="text"
          id="nome-giocatore"
          className="h-full w-full appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-1 py-2 text-xs text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 md:px-4 md:text-sm"
          name="nomeGiocatore"
          placeholder="Fuori il nome..."
        />
        <button
          type="button"
          className="flex h-full w-full items-center justify-center rounded-lg bg-sky-700 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-sm"
          onClick={() =>
            addFunct({
              title: `${inputRef.current.value} - ${title}`.toUpperCase(),
              quantity: 1,
            })
          }
        >
          Invia
        </button>
      </div>
    </div>
  );
};

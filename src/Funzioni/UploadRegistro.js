import { useContext, useRef } from "react";
import { CartContext } from "../context/regContext";

const UploadRegistro = (props) => {
  const { title } = props;
  const { addToCart } = useContext(CartContext);
  
  const inputRef = useRef(null);
  const resetInput = ()=> {
    inputRef.current.value = ""
  }
  const addToCartAndClearInput = ()=> {
    addToCart({
      title: `${inputRef.current.value} - ${title}`.toUpperCase(),
      quantity: 1,
    })
    resetInput()
  }

  return (
    <div className="mb-6 flex w-full flex-col items-center md:w-3/4">
      <label
        htmlFor="nome-giocatore"
        className="mb-1 inline-block text-xs text-gray-300 md:text-sm"
      >
        Giocatore da iscrivere sul registro

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
          className="flex h-full w-full items-center justify-center rounded-lg bg-purple-700 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-sm"
          onClick={() =>
            addToCartAndClearInput()
          }
        >
          Invia
        </button>
      </div>
    </div>
  );
};

export default UploadRegistro;

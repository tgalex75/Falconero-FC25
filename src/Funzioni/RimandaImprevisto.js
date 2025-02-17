import { useState } from "react";
import { supabase } from "../supabaseClient";
import { MdOutlineSnooze } from "react-icons/md";


const RimandaImprevisto = (props)=> {
    const {id, titolo, descrizione} = props
    
    const [isSaved, setIsSaved] = useState(false);

    const rimandaImprevisto = async () => {
        const { error } = await supabase
          .from("salvaxdopo")
          .insert([{ id: id, titolo: titolo, descrizione: descrizione }])
          .select();
        error && console.log(error);
        setIsSaved(true);
      };

      return (
        <>
        <button
        onClick={rimandaImprevisto}
        className="peer rounded-full p-2 text-center text-sm font-bold shadow-md transition duration-200 ease-in hover:scale-125 hover:bg-purple-700 hover:text-gray-300"
      >
        <MdOutlineSnooze size={36} />
      </button>
      {!isSaved ? (
        <span className="invisible text-xs transition-all duration-150 ease-in-out peer-hover:visible">
          Posticipa e salva imprevisto?
        </span>
      ) : (
        <span className="text-xs transition-all duration-150 ease-in-out">
          Imprevisto posticipato e salvato!
        </span>
      )}
        </>
      )

}

export default RimandaImprevisto
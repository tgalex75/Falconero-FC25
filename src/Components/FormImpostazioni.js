import { db } from "../Data/db";
import { useState, useEffect } from "react";

const FormImpostazioni = (props) => {
  const { id, nomeSezione, isVisible } = props;

  const [savedValues, setSavedValues] = useState(isVisible);

  const handleChange = () => {
    setSavedValues((prevValue) =>
      prevValue === 1 ? (prevValue = 0) : (prevValue = 1),
    );
  };

  const updateValuesOnDB = async () => {
    try {
      await db.sezioniAttive.update(id, { isVisible: savedValues });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateValuesOnDB();// eslint-disable-next-line
  }, [savedValues]);

  return (
    <section
      onClick={handleChange}
      className={`flex min-h-24 md:min-h-48 w-full select-none flex-col cursor-pointer hover:scale-110 transition-all items-center justify-center rounded-lg bg-[--clr-sec] p-4 text-center text-xs font-normal md:justify-around md:gap-2 md:text-lg ${savedValues === 0 ? "opacity-50 bg-gray-500" : {}}`}
    >
      <h4 className="w-full font-semibold uppercase">{nomeSezione}</h4>
    </section>
  );
};

export default FormImpostazioni;

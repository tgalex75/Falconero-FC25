import { db } from "../Data/db";

export const DelImprevisti = (tipoImprevisto, idToRemove) => {
  db[tipoImprevisto].delete(idToRemove);
};

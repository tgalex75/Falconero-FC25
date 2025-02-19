import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const useFetchData = (dbSupabase) => {
  const [data, setData] = useState([]);

  const fetchRegistryList = async () => {
    const { data: fetchedData } = await supabase.from(dbSupabase).select("*");
    setData(fetchedData ? fetchedData : []);
  };

  useEffect(() => {
    fetchRegistryList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, fetchRegistryList };
};
export default useFetchData;

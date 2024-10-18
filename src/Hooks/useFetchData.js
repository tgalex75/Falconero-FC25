import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const useFetchData = (dbSupabase) => {
  const [data, setData] = useState([]);

  const fetchRegistryList = async () => {
    const { data } = await supabase.from(dbSupabase).select("*");
    setData(data ? data : []);
  };

  useEffect(() => {
    fetchRegistryList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbSupabase]);

  return { data, fetchRegistryList };
};
export default useFetchData;

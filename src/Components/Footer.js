//import { color } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { supabase } from "../supabaseClient";

const Footer = () => {
  // const { session } = props;

  const [loggedUser, setLoggedUser] = useState(null);

  const myUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setLoggedUser({ user });
  };

  const isTestUser =
    loggedUser?.user.email === "test@test.com" ? "Utente di Test" : "";

  useEffect(() => {
    myUser();
  }, []);

  return (
    <footer
      className={
        isMobile
          ? "hidden"
          : "absolute bottom-0 left-0 m-1 flex w-full justify-between text-sm"
      }
    >
      <small className="z-10 ps-4 opacity-20">
        coded by tgalex75 - Falconero Community - beta version
      </small>
      <span className="text-xs font-bold bg-green-600 text-white opacity-75 me-32">
        {isTestUser}
      </span>
    </footer>
  );
};

export default Footer;

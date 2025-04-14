//import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
//import { isMobile } from "react-device-detect";
import pulsante from "../assets/imgs/mascotte.png";

const Dado = (props) => {
  const { clickFunc } = props;

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1.2,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-2 right-2 mb-20 flex h-24 w-24 cursor-pointer select-none items-center justify-center md:m-4 md:p-3 xl:bottom-0 xl:right-0 xl:mb-14 xl:me-4"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${pulsante})`,
      }}
      onClick={clickFunc}
    ></motion.div>
  );
};

export default Dado;

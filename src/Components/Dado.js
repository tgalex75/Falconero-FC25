//import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
//import { isMobile } from "react-device-detect";
import pulsante from "../assets/imgs/mascotte.png";

const Dado = (props) => {

  const {clickFunc} = props
  
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1.2,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-0 right-0 mb-14 me-4 flex h-24 w-24 cursor-pointer select-none items-center justify-center rounded-full md:m-4 md:p-3 md:hover:bg-gray-500/10"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${pulsante})`,
      }}
      onClick={clickFunc}
    >
      {/* <img
      src=''
        style={{
          filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
        }}
        size= {isMobile ? 72 : 112}
      /> */}
    </motion.div>
  );
};

export default Dado;

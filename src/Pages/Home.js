import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Img1 from "../assets/imgs/img1.jpg";
import Img2 from "../assets/imgs/img2.jpg";
import Img2Mobile from "../assets/imgs/img2_mobile.jpg";
import Img3 from "../assets/imgs/img3.jpg";
import Img3Mobile from "../assets/imgs/img3_mobile.jpg";
import Img4 from "../assets/imgs/img4.jpg";
import Img5 from "../assets/imgs/img5.jpg";
import rinnovi from "../assets/imgs/img5.jpg";
import ingaggi from "../assets/imgs/ingaggi.jpg";
import ingaggiMobile from "../assets/imgs/ingaggi_mobile.jpg";
import mercato from "../assets/imgs/mercato.jpg";
import WelcomeModal from "../Components/WelcomeModal";
import { MdEdit } from "react-icons/md";

const Home = () => {
  const dettagliImprevisti = [
    {
      id: 1,
      impr: "Imprevisti prepartita",
      img: Img1,
      link: "/prepartita",
    },
    {
      id: 2,
      impr: "Imprevisti Settimanali",
      img: isMobile ? Img2Mobile : Img2,
      link: "/settimana",
    },
    {
      id: 3,
      impr: "Imprevisti serie negativa",
      img: isMobile ? Img3Mobile : Img3,
      link: "/serie-negativa",
    },
    {
      id: 4,
      impr: "Imprevisti Rinnovi",
      img: rinnovi,
      link: "/rinnovi",
    },
    {
      id: 5,
      impr: "Imprevisti Ingaggi",
      img: isMobile ? ingaggiMobile : ingaggi,
      link: "/ingaggi",
    },
    {
      id: 6,
      impr: "Imprevisti Mercato",
      img: mercato,
      link: "/mercato",
    },
    {
      id: 7,
      impr: "Saldo Punti",
      img: Img4,
      link: "/saldo-punti",
    },
    {
      id: 8,
      impr: "Editor Imprevisti",
      img: Img5,
      link: "/editor-imprevisti",
    },
  ];

  return (
    <>
      <WelcomeModal />
      <section
        className={`flex h-full w-full flex-wrap bg-stone-950 font-bold text-gray-800`}
      >
        {dettagliImprevisti.map((el) => (
          <div
            key={el.id}
            style={{
              zIndex: el.id,
            }}
            className="ease-[cubic-bezier(0.770, 0.000, 0.175, 1.000)] group grow basis-1/2 cursor-pointer items-center justify-start overflow-hidden transition-all duration-500 [box-shadow:-12px_0px_10px_-3px_rgba(2,2,2,0.5)] hover:text-gray-300 md:basis-1/4"    
          >
            <Link to={el.link} className="flex h-full bg-transparent">
              <h2
                style={{}}
                className={`flex rotate-180 items-center justify-center bg-[--clr-ter] px-4 text-center text-[.4rem] font-bold uppercase text-gray-200 drop-shadow-lg transition-all [text-shadow:rgb(34,34,34)_0px_4px_4px] [writing-mode:vertical-lr] group-hover:w-1/4 group-hover:border-l-[.35rem] group-hover:border-[--clr-prim] group-hover:bg-[--clr-sec] group-hover:px-6 md:justify-start md:px-2 md:ps-8 md:text-[1.5dvw] md:group-hover:w-auto md:group-hover:border-l-[1.5rem]`}
              >
                {el.impr}
              </h2>
              <div
                style={{
                  backgroundImage: `url(${el.img})`,
                }}
                className={`flex w-full items-end justify-end bg-black/20 bg-cover bg-center bg-no-repeat grayscale transition-all group-hover:w-full group-hover:scale-110 group-hover:grayscale-0 md:group-hover:w-full`}
              >
                <div className="absolute bottom-4 right-4 flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300/30 md:p-2">
                  <MdEdit
                    size={32}
                    color="white"
                    className="cursor-pointer fill-gray-300 hover:fill-gray-200"
                    onClick={() => console.log("prova")}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;

import { Link } from "react-router-dom";
import {
  FaCalendarDays,
  FaPersonFalling,
  FaArrowTrendDown,
  FaFileInvoiceDollar,
  FaMoneyBill1Wave,
  FaArrowRightArrowLeft,
} from "react-icons/fa6";

const Home = () => {
  const dettagliImprevisti = [
    {
      id: 1,
      impr: "prepartita",
      img: <FaPersonFalling size="80%" />,
      link: "/prepartita",
      bg: "--clr-sec",
    },
    {
      id: 2,
      impr: "Settimanali",
      img: <FaCalendarDays size="80%" />,
      link: "/settimana",
      bg: "--clr-ter",
    },
    {
      id: 3,
      impr: "serie negativa",
      img: <FaArrowTrendDown size="80%" />,
      link: "/serie-negativa",
      bg: "--clr-sec",
    },
    {
      id: 4,
      impr: "Ingaggi",
      img: <FaFileInvoiceDollar size="80%" />,
      link: "/ingaggio",
      bg: "--clr-ter",
    },
    {
      id: 5,
      impr: "Mercato",
      img: <FaMoneyBill1Wave size="80%" />,
      link: "/offerte-mercato",
      bg: "--clr-sec",
    },
    {
      id: 6,
      impr: "Saldo Punti",
      img: <FaArrowRightArrowLeft className="rotate-90" size="80%" />,
      link: "/saldo-punti",
      bg: "--clr-ter",
    },
  ];

  return (
    <>
      <section
        className={`flex h-full w-full flex-wrap bg-stone-950 font-bold text-gray-800`}
      >
        {dettagliImprevisti.map((el) => (
          <div
            key={el.id}
            style={{
              zIndex: el.id,
            }}
            className="ease-[cubic-bezier(0.770, 0.000, 0.175, 1.000)] group h-1/3 grow basis-1/2 xl:basis-1/3 cursor-pointer items-center justify-start overflow-hidden transition-all duration-150 [box-shadow:-12px_0px_10px_-3px_rgba(2,2,2,0.5)] hover:text-gray-300 xl:h-1/2"
          >
            <Link to={el.link} className="flex h-full bg-transparent">
              <h2
                style={{}}
                className={`flex rotate-180 items-center justify-center bg-[${el.bg}] px-4 text-center text-[.4rem] font-bold uppercase text-gray-200 drop-shadow-lg transition-all [text-shadow:rgb(34,34,34)_0px_4px_4px] [writing-mode:vertical-lr] group-hover:bg-purple-700 md:justify-start md:px-2 md:ps-8 md:text-[1.5dvw]`}
              >
                {el.impr}
              </h2>
              <div
                className={`flex w-full items-center justify-center bg-black/20 transition-all hover:bg-slate-800`}
              >
                {el.img}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;

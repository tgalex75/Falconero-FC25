import { LiaTrophySolid } from "react-icons/lia";
import { GiLaurelsTrophy, GiTrophyCup, GiTrophy, GiDiamondTrophy, GiSoccerBall } from "react-icons/gi";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { PiListBulletsBold } from "react-icons/pi";
import { IoMdPodium } from "react-icons/io";
import { TbPlayFootball } from "react-icons/tb";
import { GiGoalKeeper } from "react-icons/gi";

export const bonusTrofei = [
    {
        id: "cnz10",
        nome: "Coppa Nazionale +10",
        valore: 10,
      icon: <GiTrophyCup size={28} className="mb-1" />,
    },
    {
      id: "scd18",
      nome: "Scudetto +18",
      valore: 18,
      icon: <LiaTrophySolid size={28} className="mb-1" />,
    },
    {
      id: "chl30",
      nome: "Champions League +30",
      valore: 30,
      icon: <GiTrophy size={28} className="mb-1" />,
    },
    {
      id: "eul20",
      nome: "Europa League +20",
      valore: 20,
      icon: <GiDiamondTrophy size={28} className="mb-1" />,
    },
    {
      id: "ecl15",
      nome: "Conference League +15",
      valore: 15,
      icon: <GiLaurelsTrophy size={28} className="mb-1" />,
    },
];
export const bonusCessioni = [
    {
        id: "c01",
      nome: "≥70 +2",
      valore: 2,
    },
    {
        id: "c02",
        nome: "≥75 +4",
        valore: 4,
    },
    {
        id: "c03",
        nome: "≥80 +5.5",
        valore: 5.5,
    },
    {
        id: "c04",
        nome: "≥85 +7",
        valore: 7,
    },
    {
        id: "c05",
        nome: "≥90 +9",
        valore: 9,
    },
];

export const malusAcquisti = [
    {
      id: "a03",
      nomeUnder: "≥70 -3",
      nomeOver: "≥70 -1.5",
      nomeSerieMinori: "≥70 -1.5",
      nomeSerieMinoriOver: "≥70 0.5",
      valoreUnder: -3,
      valoreOver: -1.5,
      valoreSerieMinore: -1.5,
      valoreSerieMinoreOver: -0.5,
    },
    {
      id: "a06",
      nomeUnder: "≥75 -6",
      nomeOver: "≥75 -3",
      nomeSerieMinori: "≥75 -3",
      nomeSerieMinoriOver: "≥75 -1.5",
      valoreUnder: -6,
      valoreOver: -3,
      valoreSerieMinore: -3,
      valoreSerieMinoreOver: -1.5,
    },
    {
      id: "a09",
      nomeUnder: "≥80 -9",
      nomeOver: "≥80 -6",
      nomeSerieMinori: "≥80 -4.5",
      nomeSerieMinoriOver: "≥80 -3",
      valoreUnder: -9,
      valoreOver: -6,
      valoreSerieMinore: -4.5,
      valoreSerieMinoreOver: -3,
    },
    {
      id: "a12",
      nomeUnder: "≥85 -12",
      nomeOver: "≥85 -9",
      nomeSerieMinori: "≥85 -6",
      nomeSerieMinoriOver: "≥85 -4.5",
      valoreUnder: -12,
      valoreOver: -9,
      valoreSerieMinore: -6,
      valoreSerieMinoreOver: -4.5,
    },
    {
      id: "a15",
      nomeUnder: "≥90 -15",
      nomeOver: "≥90 -12",
      nomeSerieMinori: "≥90 -7.5",
      nomeSerieMinoriOver: "≥90 -6",
      valoreUnder: -15,
      valoreOver: -12,
      valoreSerieMinore: -7.5,
      valoreSerieMinoreOver: -6,
    },
];

export const trendPrestazioni = [
    {
        id: "srn01",
        nome: "Serie Negativa -1",
        valore: -1,
        icon: <IoMdTrendingDown size={28} className="mb-1" />,
    },
    {
        id: "srp01",
        nome: "Serie Positiva +1",
        valore: 1,
        icon: <IoMdTrendingUp size={28} className="mb-1" />,
    },
]

export const piazzamentoCampionato = [
    {
        id: "pz2",
        nome: "2° +9",
        valore: 9,
        icon: <IoMdPodium size={28} className="mb-1" />,
    },
    {
        id: "pz3",
        nome: "3° +6",
        valore: 6,
        icon: <IoMdPodium size={28} className="mb-1" />,
    },
    {
        id: "pz4",
        nome: "4° +5",
        valore: 5,
        icon: <PiListBulletsBold size={28} className="mb-1" />,
    },
    {
        id: "pz5",
        nome: "5° +4",
        valore: 4,
        icon: <PiListBulletsBold size={28} className="mb-1" />,
    },
    {
        id: "pz6",
        nome: "6° +3",
        valore: 3,
        icon: <PiListBulletsBold size={28} className="mb-1" />,
    },
    {
        id: "pz7",
        nome: "7° +1",
        valore: 1,
        icon: <PiListBulletsBold size={28} className="mb-1" />,
    },
    {
      id: "cpc05",
      nome: "Marcatore +5",
      valore: 5,
      icon: <GiSoccerBall size={28} className="mb-1" />,
    },
    {
      id: "ast03",
      nome: "Assist +3",
      valore: 3,
      icon: <TbPlayFootball size={28} className="mb-1" />,
    },
    {
      id: "cls01",
      nome: "Portiere +3",
      valore: 3,
      icon: <GiGoalKeeper size={28} className="mb-1" />,
    },
  ]
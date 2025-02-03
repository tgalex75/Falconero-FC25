import { LiaTrophySolid } from "react-icons/lia";
import { GiLaurelsTrophy, GiTrophyCup, GiTrophy, GiDiamondTrophy } from "react-icons/gi";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { PiListBulletsBold } from "react-icons/pi";
import { IoMdPodium } from "react-icons/io";

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
      nome: "≥70 +1.5",
      valore: 1.5,
    },
    {
        id: "c02",
        nome: "≥75 +3",
        valore: 3,
    },
    {
        id: "c03",
        nome: "≥80 +4.5",
        valore: 4.5,
    },
    {
        id: "c04",
        nome: "≥85 +6",
        valore: 6,
    },
    {
        id: "c05",
        nome: "≥90 +7.5",
        valore: 7.5,
    },
];

export const malusAcquisti = [
    {
      id: "a03",
      nome: "≥70 -3",
      valore: -3,
    },
    {
      id: "a06",
      nome: "≥75 -6",
      valore: -6,
    },
    {
      id: "a09",
      nome: "≥80 -9",
      valore: -9,
    },
    {
      id: "a12",
      nome: "≥85 -12",
      valore: -12,
    },
    {
        id: "a15",
      nome: "≥90 -15",
      valore: -15,
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
    /* {
      id: "svz05",
      nome: "Salvezza +5",
      valore: 5,
      icon: <PiListBulletsBold size={28} className="mb-1" />,
    }, */
  ]

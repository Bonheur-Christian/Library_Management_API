import Link from "next/link";
import LibraryAccordion from "./LibraryAccordion";
import { BiMath } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { FaMicroscope, FaEarthAfrica, FaLanguage } from "react-icons/fa6";
import { GiAtom, GiTakeMyMoney } from "react-icons/gi";
import { IoMagnetOutline } from "react-icons/io5";
import { SiStudyverse } from "react-icons/si";
import Image from "next/image";

interface LibraryProps{
    logoUrl:string
}

export default function SideBar({logoUrl}:LibraryProps) {
  const ordinaryLevel = [
    { icon: <BiMath />, link: "Mathematics" },
    { icon: <IoMagnetOutline />, link: "Physics" },
    { icon: <FaMicroscope />, link: "Biology" },
    { icon: <FaEarthAfrica />, link: "Geography" },
    { icon: <GiAtom />, link: "Chemistry" },
    { icon: <FaArchive />, link: "History" },
    { icon: <GiTakeMyMoney />, link: "E-Ship" },
    { icon: <FaLanguage />, link: "Ikinyarwanda" },
    { icon: <FaLanguage />, link: "English" },
  ];

  const advancedLevel = [
    { icon: <BiMath />, link: "Mathematics" },
    { icon: <IoMagnetOutline />, link: "Computer Science" },
    { icon: <GiTakeMyMoney />, link: "Economics" },
    { icon: <FaEarthAfrica />, link: "Geography" },
    { icon: <GiTakeMyMoney />, link: "E-Ship" },
    { icon: <FaLanguage />, link: "Ikinyarwanda" },
    { icon: <FaLanguage />, link: "English" },
    { icon: <SiStudyverse />, link: "GSCS" },
  ];



  return (
    <div className="space-y-6">
      <div className="w-full bg-indigo-900 sticky top-0 z-50 py-6">
        <Image src={logoUrl} height={200} width={200} alt="Library" />
      </div>

      <LibraryAccordion
        title="Ordinary Level "
        items={ordinaryLevel}
        initiallyOpen={true}
      />
      <LibraryAccordion
        title="Advanced Level "
        items={advancedLevel}
        initiallyOpen={false}
      />
      <Link href="/library/lent" className="font-semibold text-white block px-4">
        Books Lent
      </Link>
      <Link href="/library/returned" className="font-semibold text-white px-4">
        Book Returned
      </Link>
    </div>
  );
}

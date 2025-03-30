import { BiMath } from "react-icons/bi";
import { IoMagnetOutline } from "react-icons/io5";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaMicroscope } from "react-icons/fa";
import { GiAtom } from "react-icons/gi";
import { FaArchive } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa6";
import { SiStudyverse } from "react-icons/si";
import LibraryAccordion from "@/components/LibraryAccordion";
import Image from "next/image";

export default function Library() {
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
    <div className="flex">
      <div className="w-[25%] bg-indigo-900 min-h-screen px-6 py-10 space-y-12">
        <div className="w-full bg-indigo-900 sticky top-0 z-50 py-6">
          <Image src="svg/library.svg" height={200} width={200}  alt="Library"/>
        </div>
        <p className="text-2xl text-white">All Books</p>

        <LibraryAccordion
          title="Ordinary Level "
          items={ordinaryLevel}
          initiallyOpen={true}
        />
        <LibraryAccordion
          title="Ordinary Level "
          items={advancedLevel}
          initiallyOpen={false}
        />
      </div>

      <div className="w-[60%] px-32 pt-32 space-y-12 "></div>
    </div>
  );
}

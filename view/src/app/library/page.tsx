import { FaBook } from "react-icons/fa6";
import { BiMath } from "react-icons/bi";
import { IoMagnetOutline } from "react-icons/io5";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaMicroscope } from "react-icons/fa";
import { GiAtom } from "react-icons/gi";
import { FaArchive } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa6";

export default function Library() {
  const libraryLinks = [
    { icon: <FaBook />, link: "All" },
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
  return (
    <div className="flex">
      <div className="w-[20%] bg-blue-500 h-screen px-6 py-10">
        <h1 className="text-4xl font-medim text-white ">Library</h1>
      </div>

      <div className="w-[60%] px-32 pt-32 space-y-12 "></div>
    </div>
  );
}

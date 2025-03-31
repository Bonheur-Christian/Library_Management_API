"use client";

import { BiMath } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoMagnetOutline } from "react-icons/io5";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaMicroscope } from "react-icons/fa";
import { GiAtom } from "react-icons/gi";
import { FaArchive } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa6";
import { SiStudyverse } from "react-icons/si";
import { IoMdNotificationsOutline } from "react-icons/io";
import LibraryAccordion from "@/components/LibraryAccordion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Library() {
  type Book = {
    book_id: number;
    bookname: string;
    subject: string;
    academic_year: string;
    isbn: string;
    published_year: number;
    quantity: number;
  };

  const [courseBooks, setCourseBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchCourseBooks = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/course-books/all-books"
        );
        const data = await res.json();

        if (data.Books) setCourseBooks(data.Books);
        console.log("No Books Found");
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };

    fetchCourseBooks();
  }, []);
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
          <Image src="svg/library.svg" height={200} width={200} alt="Library" />
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
        <a href="/library/lent" className="font-semibold text-white">Books Lent</a>
      </div>

      <div className="w-[80%] py-6 px-12 space-y-10">
        <div className="flex items-center justify-between w-full">
          <input
            type="search"
            placeholder="Search..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoMdNotificationsOutline size={30} className="text-gray-400 cursor-pointer" title="Notifications"/>
        </div>
        <div>
          <div className="flex items-center justify-between pb-6">
            <p className="text-xl text-indigo-900">All Books</p>
            <FaPlus size={25} title="Add Book" className="text-indigo-900 font-light cursor-pointer"  />
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Book Id</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Book Name</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Subject</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Academic Year</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">ISBN</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Published Year</th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">Quantity(copies)</th>
              </tr>
            </thead>
            <tbody>
              {courseBooks.map((book, index) => (
                <tr key={index} className="text-center hover:bg-gray-100 ">
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2 ">{book.book_id}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.bookname}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.subject}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.academic_year}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.isbn}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.published_year}</td>
                  <td className="border border-indigo-900 text-gray-600 px-4 py-2">{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

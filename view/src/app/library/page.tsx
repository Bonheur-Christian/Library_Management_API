"use client";

import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";

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
  const [selectedYear, setSelectedYear] = useState<string>("year");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const refreshBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/course-books/all-books");
      const data = await response.json();
      if (data.Books) setCourseBooks(data.Books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const filterBooks = courseBooks.filter((book) => {
    if (selectedYear === "year") return true;
    return book.academic_year === selectedYear;
  });

  const displayedBooks = selectedYear === "year" ? courseBooks : filterBooks;

  return (
    <div className="flex">
      <div className="w-[25%] bg-indigo-900 min-h-screen px-6 py-10 space-y-12">
        <SideBar logoUrl="/svg/library.svg" />
      </div>

      <div className="w-[80%] py-6 px-12 space-y-10">
        <div className="flex items-center justify-between w-full sticky top-0 bg-white pb-10 pt-4">
          <input
            type="search"
            placeholder="Search..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoMdNotificationsOutline
            size={30}
            className="text-gray-400 cursor-pointer"
            title="Notifications"
          />
        </div>
        <div>
          <div className="flex items-center justify-between pb-6">
            <p className="text-xl text-indigo-900">All Books</p>
            <select
              name="year"
              id="year"
              className="outline-none border-2 border-indigo-900 rounded-lg px-6 py-2 cursor-pointer"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="year">Select Year</option>
              <option value="s1">S1</option>
              <option value="s2">S2</option>
              <option value="s3">S3</option>
              <option value="s4">S4</option>
              <option value="s5">S5</option>
              <option value="s6">S6</option>
            </select>
            <FaPlus
              size={25}
              title="Add Book"
              className="text-indigo-900 font-light cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add a New Book"
            onBookAdded={refreshBooks}
          />
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Book Id
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Book Name
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Subject
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Academic Year
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  ISBN
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Published Year
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Quantity(copies)
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedBooks.length > 0 ? (
                displayedBooks.map((book, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100 ">
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2 ">
                      {book.book_id}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.bookname}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.subject}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.academic_year}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.isbn}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.published_year}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.quantity}
                    </td>
                    <td className="border border-indigo-900 px-4 py-2 space-x-4 text-white">
                      <button className="bg-red-500 hover:bg-red-700 font-medium rounded-xl py-2 px-6">
                        Delete
                      </button>
                      <button className="bg-green-500 hover:bg-green-700 font-medium rounded-xl py-2 px-6">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center hover:bg-gray-100 ">
                  <td
                    colSpan={8}
                    className="border border-indigo-900 text-red-600 px-4 py-12 text-2xl"
                  >
                    No Books Found Related For This Academic Year
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

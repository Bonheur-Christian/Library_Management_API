"use client";

import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import AddCourseBookModal from "@/components/AddCourseBookModal";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCourseBooks = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/course-books/all-books"
        );
        const data = await res.json();

        if (data.Books) setCourseBooks(data.Books);
        else console.log("No Books Found");
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };

    fetchCourseBooks();
  }, []);

  const refreshBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/course-books/all-books"
      );
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = displayedBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayedBooks.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //Delete Book
  const handleDelete = async (bookId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/course-books/delete-course-book/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Book deleted successfully:");
        refreshBooks();

        return;
      }

      console.log("failed to delete Book");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex">
      <SideBar logoUrl="/svg/library.svg" />

      <div className="w-[80%] py-6 px-12 space-y-4">
        <TopBar />
        <div>
          <div className="flex items-center justify-between pb-6">
            <p className="text-xl text-indigo-900">All Books</p>
            <select
              name="year"
              id="year"
              className="outline-none border-2 border-indigo-900 rounded-lg px-6 py-2 cursor-pointer"
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
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

          <AddCourseBookModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add a New Book"
            onBookAdded={refreshBooks}
          />

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Book Id
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Book Name
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Subject
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Academic Year
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  ISBN
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Published Year
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Quantity(copies)
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-2 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
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
                      <button
                        className="bg-red-500 hover:bg-red-700 font-medium rounded-xl py-2 px-6"
                        onClick={() => handleDelete(book.book_id)}
                      >
                        Delete
                      </button>
                      <button className="bg-green-500 hover:bg-green-700 font-medium rounded-xl py-2 px-6">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center hover:bg-gray-100">
                  <td
                    colSpan={8}
                    className="border border-indigo-900 text-red-600 px-4 py-12 text-2xl"
                  >
                    No Books Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border border-indigo-900 hover:bg-indigo-900 hover:text-white duration-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-900 text-white"
                      : "bg-white text-indigo-900 border-indigo-900 hover:bg-indigo-900 hover:text-white duration-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed border-indigo-900 hover:bg-indigo-900 hover:text-white duration-500"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

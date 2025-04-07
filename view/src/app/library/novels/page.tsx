"use client";

import AddNovelModal from "@/components/AddNovelModal";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Novels() {
  type Book = {
    bookID: number;
    bookName: string;
    book_author: string;
    bookISBN: string;
    price: number;
    published_year: number;
    quantity: number;
  };

  const [novels, setNovels] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const novelsPerPage = 10;
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/novels/all-books");

        if (res.status === 204) {
          console.log("No Novels Found");
          setNovels([]);

          return;
        }

        const data = await res.json();

        data.Books ? setNovels(data.Books) : setNovels(data.Books || []);
      } catch (err) {
        console.log("Error in fetching Novels ", err);
      }
    };

    fetchNovels();
  }, []);

  const refreshNovels = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/novels/all-books"
      );
      
      if (res.status === 204) {
        console.log("No Novels Found");
        setNovels([]);

        return;
      }

      const data = await res.json();

      data.Books ? setNovels(data.Books) : setNovels(data.Books || []);
    } catch (error) {
      console.error("Error fetching Novels", error);
    }
  };

  //pagination logic

  const indexOfLastItem = currentPage * novelsPerPage;
  const indexOfFirstItem = indexOfLastItem - novelsPerPage;
  const currentBooks = novels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(novels.length / novelsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //Deleting Novel

  const handleDelete = async (bookID: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/novels/delete-book/${bookID}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Book Deleted");

        refreshNovels();

        return;
      }

      console.log("Book not deleted");
    } catch (err) {
      console.log("Error in Deleting Novel");
    }
  };

  return (
    <div className="flex">
      <SideBar logoUrl="../svg/library.svg" />
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
            <p className="text-xl text-indigo-900">All Novels</p>

            <FaPlus
              size={25}
              title="Add Book"
              className="text-indigo-900 font-light cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <AddNovelModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add a New Book"
            onBookAdded={refreshNovels}
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
                  Author
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  ISBN
                </th>
                <th className="border-2 border-indigo-900 text-gray-600 px-4 py-2">
                  Price
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
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100 ">
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2 ">
                      {book.bookID}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.bookName}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.book_author}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.bookISBN}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.price}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.published_year}
                    </td>
                    <td className="border border-indigo-900 text-gray-600 px-4 py-2">
                      {book.quantity}
                    </td>
                    <td className="border border-indigo-900 px-4 py-2 space-x-4 text-white">
                      <button
                        onClick={() => handleDelete(book.bookID)}
                        className="bg-red-500 hover:bg-red-700 font-medium rounded-xl py-2 px-6"
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

"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onBookAdded: () => void;
}

const AddNovelModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onBookAdded,
}) => {
  if (!isOpen) return null;

  interface FormData {
    title: string;
    author: string;
    isbn: string;
    price: number;
    published_year: number;
    quantity: number;
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    isbn: "",
    price: 0.0,
    published_year: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/novels/save-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Book added successfully:", data);

        setFormData({
          title: "",
          author: "",
          isbn: "",
          price: 0,
          published_year: 0,
          quantity: 0,
        });

        onBookAdded();
        onClose();
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (err) {
      console.log("Error in fetching:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[rgba(0,0,0,0.4)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="text-2xl text-gray-600 font-semibold">{title}</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
            title="Close"
          >
            ❎
          </button>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <label className="block text-gray-600 font-semibold">Book Name</label>
              <input
                value={formData.title}
                onChange={handleChange}
                name="title"
                placeholder="Enter Book Name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">Author</label>
              <input
                value={formData.author}
                onChange={handleChange}
                name="author"
                placeholder="Enter Author Name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">ISBN</label>
              <input
                value={formData.isbn}
                onChange={handleChange}
                name="isbn"
                placeholder="Enter ISBN"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">Price</label>
              <input
                name="price"
                onChange={handleChange}
                type="text"
                placeholder="Enter Price" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">Published Year</label>
              <input
                name="published_year"
                onChange={handleChange}
                type="text" 
                placeholder="Enter Published Year"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">Quantity</label>
              <input
                name="quantity"
                onChange={handleChange}
                type="text" 
                placeholder="Enter Quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Novel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNovelModal;
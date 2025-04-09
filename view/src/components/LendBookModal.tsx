import { useState } from "react";

interface LendModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onBookLent: () => void;
  book_id: number;
}

const LendBookModal: React.FC<LendModalProps> = ({
  isOpen,
  onClose,
  title,
  onBookLent,
  book_id,
}) => {
  if (!isOpen) return null;

  interface FormData {
    borrower_name: string;
    academic_year: string;
  }

  const [formData, setFormData] = useState<FormData>({
    borrower_name: "",
    academic_year: "",
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
        "http://localhost:3001/api/course-books/lend-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ book_id, ...formData }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Book added successfully:", data);

        setFormData({
          borrower_name: "",
          academic_year: "",
        });

        onBookLent();
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
            onClick={() => onClose()}
            className="text-gray-600 hover:text-red-500 text-xl cursor-pointer"
            title="Close"
          >
            ❎
          </button>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <label className="block text-gray-600 font-semibold">
                Book ID
              </label>
              <input
                readOnly
                value={book_id}
                name="book_id"
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">
                Borrower Name
              </label>
              <input
                value={formData.borrower_name}
                onChange={handleChange}
                name="borrower_name"
                placeholder="Enter Borrower Name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-gray-600 font-semibold">
                Academic Year
              </label>
              <input
                value={formData.academic_year}
                onChange={handleChange}
                name="academic_year"
                placeholder="Enter Academic Year"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Lend Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LendBookModal;

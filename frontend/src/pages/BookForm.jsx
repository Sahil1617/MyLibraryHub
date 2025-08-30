import { useState, useEffect } from "react";
import API from "../services/api";

function BookForm({ fetchBooks, editingBook, setEditingBook, showForm, setShowForm }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genere: "",
    year: "",
    status: "Reading",
  });

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
      setShowForm(true);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("⚠️ Please log in first!");

    try {
      if (editingBook) {
        await API.put(`/books/${editingBook._id}`, book, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/books", book, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchBooks();
      setBook({ title: "", author: "", genere: "", year: "", status: "Reading" });
      setEditingBook(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save book. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-6 ">
      {/* Toggle button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
      >
        {editingBook ? "✏️ Edit Book" : showForm ? "Close Form" : "➕ Add New Book"}
      </button>

      {/* Sliding + fading form */}
      <div
        className={`transition-all duration-500 ease-out transform ${
          showForm ? "opacity-100 translate-y-0 max-h-[1000px]" : "opacity-0 -translate-y-10 max-h-0"
        } overflow-hidden`}
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 shadow-2xl rounded-2xl border border-gray-200 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Title</label>
              <input
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Book Title"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Author</label>
              <input
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Genere</label>
              <input
                name="genere"
                value={book.genere}
                onChange={handleChange}
                placeholder="Genre"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600 font-medium">Published Year</label>
              <input
                name="year"
                value={book.year}
                onChange={handleChange}
                placeholder="YYYY"
                type="number"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-gray-600 font-medium">Status</label>
              <select
                name="status"
                value={book.status}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option>Reading</option>
                <option>Finished</option>
                <option>Wishlist</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition shadow-lg"
          >
            {editingBook ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;

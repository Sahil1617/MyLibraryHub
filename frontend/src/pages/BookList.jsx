import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookList({ books, setBooks, setEditingBook, fetchBooks }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    q: "", // single input for title + author
    genere: "",
    status: "",
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const queryString = Object.entries(searchParams)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const res = await API.get(`/books/search?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setSearchParams({ q: "", genere: "", status: "" });
    fetchBooks(); // fetch all books again
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Your Library</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <form
        onSubmit={handleSearch}
        className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
      >
        <input
          name="q"
          placeholder="Search by Title or Author"
          value={searchParams.q}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="genere"
          placeholder="Filter by Genere"
          value={searchParams.genere}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          name="status"
          value={searchParams.status}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Status</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
          <option value="Wishlist">Wishlist</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Reset Filters
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        {books.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No books found. Add some!
          </p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Genere</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr
                  key={b._id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-2">{b.title}</td>
                  <td className="px-4 py-2">{b.author}</td>
                  <td className="px-4 py-2">{b.genere}</td>
                  <td className="px-4 py-2">{b.year}</td>
                  <td className="px-4 py-2">{b.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditingBook(b);
                        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
                      }}
                      className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (
                          window.confirm(
                            "Are you sure you want to delete this book?"
                          )
                        ) {
                          await API.delete(`/books/${b._id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setBooks((prev) =>
                            prev.filter((book) => book._id !== b._id)
                          );
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BookList;

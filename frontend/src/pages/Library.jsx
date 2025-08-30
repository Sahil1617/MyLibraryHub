import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import BookList from "./BookList";
import BookForm from "./BookForm";

function Library() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.get("/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md font-mono">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold">MyLibraryHub</div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200 transition">
                About
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="hover:text-gray-200 transition"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Add / Edit Book Form */}
      <div className="container mx-auto mt-6">
        <BookForm
          fetchBooks={fetchBooks}
          editingBook={editingBook}
          setEditingBook={setEditingBook}
          showForm={showForm}
          setShowForm={setShowForm}
        />

        <BookList
          books={books}
          setBooks={setBooks}
          setEditingBook={setEditingBook}
          fetchBooks={fetchBooks}
        />
      </div>
    </div>
  );
}

export default Library;

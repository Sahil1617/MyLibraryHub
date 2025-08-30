import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md font-mono mb-12">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold">MyLibraryHub</div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-200 transition font-semibold underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-gray-200 transition">
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center px-6 md:px-0 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-pulse">
          📚 About MyLibraryHub
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          MyLibraryHub is a modern library management platform designed to help
          book enthusiasts organize, track, and discover their personal
          collection. From reading lists to genres, everything is at your
          fingertips!
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Organize Your Library
          </h2>
          <p className="text-gray-600">
            Keep all your books in one place with categories, status tracking,
            and easy search.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Track Your Progress
          </h2>
          <p className="text-gray-600">
            Track what you are currently reading, finished, or wish to read
            next. Stay on top of your goals!
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Insights & Dashboard
          </h2>
          <p className="text-gray-600">
            Gain insights into your collection with interactive charts, stats,
            and analytics.
          </p>
        </div>
      </div>

      {/* About the Developer Section */}
      <div className="mt-16 text-center px-6 md:px-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          About the Developer
        </h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-md mx-auto hover:shadow-2xl transition duration-300">
          <img
            src="https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg?w=360"
            alt="Developer"
            className="w-36 h-36 mx-auto rounded-full mb-2"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Sahil Jadhav
          </h3>
          <p className="text-gray-600 mb-4">
            Full-Stack Developer & Creator of MyLibraryHub. This project was
            individually developed to manage books, track reading status, and
            visualize library statistics efficiently.
          </p>
          <p className="text-gray-500">
            <strong>Technologies Used:</strong> MERN Stack, React, Node.js, Express, MongoDB, Tailwind CSS
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-100 p-6 text-center text-gray-600">
        © 2025 MyLibraryHub. All rights reserved.
      </footer>
    </div>
  );
}

export default About;

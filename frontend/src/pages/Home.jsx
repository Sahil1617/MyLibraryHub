import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
              <Link to="/signup" className="hover:text-gray-200 transition">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main
  className="flex-grow bg-gray-100 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/lib.jpg')" }}
>
  <div className="relative container mx-auto py-24 px-4">
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 rounded-lg"></div>

    {/* Text content */}
    <div className="relative text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
        Welcome to MyLibraryHub
      </h1>
      <p className="text-lg text-gray-100 mb-8 drop-shadow">
        Keep track of your books, organize your library, and explore new reads.
      </p>
      <Link
        to="/signup"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  </div>
</main>

      {/* Footer */}
      <footer className="text-gray-300 text-sm font-mono h-16 bg-linear-to-t from-sky-500 to-indigo-500">
        <div className="container mx-auto flex flex-col items-center text-center">
          {/* Line 1: Copyright */}
          <p>© 2025 All rights reserved by Sahil Jadhav</p>

          {/* Line 2: Social icons */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/Sahil1617"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6 hover:text-white transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/sahil-jadhav-1628sj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 hover:text-white transition" />
            </a>
          </div>

          {/* Line 3: Privacy & Terms */}
          <div className="flex space-x-3">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

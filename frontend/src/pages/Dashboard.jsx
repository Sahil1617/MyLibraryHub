import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import {FadeLoader} from "react-spinners";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/books/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats)
  return (
    <div className="flex justify-center items-center mt-24">
      <FadeLoader color="#2563eb" size={200} />
      <h4>Loading</h4>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md font-mono mb-8">
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
              <Link to="/library" className="hover:text-gray-200 transition">
                Library
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="hover:text-gray-200 transition"
              >
                SignOut
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Total Books Centered */}
      <div className="flex flex-col items-center justify-center mb-12">
        <p className="text-gray-500 text-lg mb-2">Total Books</p>
        <h1 className="text-6xl md:text-7xl font-extrabold text-blue-600">
          {stats.totalBooks}
        </h1>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Books by Status - Pie Chart */}
        <div className="p-6 shadow-xl rounded-2xl border border-gray-200 bg-white hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Books by Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.booksByStatus}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats.booksByStatus.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Books by Genre - Bar Chart */}
        <div className="p-6 shadow-xl rounded-2xl border border-gray-200 bg-white hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Books by Genre
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.booksBygenere}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
              />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

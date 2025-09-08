import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-12 text-lg font-semibold">
          <li>
            <Link 
              to="/" 
              className="px-6 py-3 rounded-lg transition-colors duration-300 bg-blue-600 hover:bg-blue-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className="px-6 py-3 rounded-lg transition-colors duration-300 bg-green-600 hover:bg-green-700"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-lg transition-colors duration-300 bg-red-600 hover:bg-red-700"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/resume" 
              className="px-6 py-3 rounded-lg transition-colors duration-300 bg-purple-600 hover:bg-purple-700"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

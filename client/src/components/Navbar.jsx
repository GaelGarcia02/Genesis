import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import { confirmLogout } from "../utils/sweetAlerts";

function Navbar() {
  const { user, logout, isAuthenticated, userType } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Obtener la ubicación actual

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="bg-[#448dc9] flex justify-between items-center w-full py-3 px-4 text-white font-bold">
      <div className="flex items-center">
        <button
          onClick={handleMenuToggle}
          className="lg:hidden focus:outline-none"
        >
          <FiMenu className="text-3xl" />
        </button>
      </div>
      <Link to="/horses">
        <img src={logo} alt="Logo" className="w-10 lg:mr-auto lg:ml-0" />
      </Link>

      <ul className="hidden lg:flex lg:gap-3 lg:mx-5">
        <li>
          <Link
            to="/horses"
            className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ${
              location.pathname === "/horses" ? "bg-[#2a567a]" : ""
            }`}
            onClick={handleLinkClick}
          >
            Inicio
          </Link>
        </li>
        {/*  */}
        {isAuthenticated &&
          (userType === "admin" || userType === "superadmin") && (
            <li>
              <Link
                to="/users"
                className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ${
                  location.pathname === "/users" ? "bg-[#2a567a]" : ""
                }`}
              >
                Usuarios
              </Link>
            </li>
          )}

        <li>
          <Link
            to="/vets"
            className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ${
              location.pathname === "/vets" ? "bg-[#2a567a]" : ""
            }`}
          >
            Veterinarios
          </Link>
        </li>

        {/*  */}

        <li>
          <Link
            to="/reports"
            className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ${
              location.pathname === "/reports" ? "bg-[#2a567a]" : ""
            }`}
          >
            Reportes
          </Link>
        </li>

        <li>
          <Link
            to={user ? `profile/${user.id}` : "/"}
            className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ${
              location.pathname.startsWith("/profile") ? "bg-[#2a567a]" : ""
            }`}
          >
            Perfil
          </Link>
        </li>
      </ul>

      <Link
        onClick={() => confirmLogout(logout)}
        className="hidden lg:block hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-6 py-3 ml-auto"
      >
        Cerrar Sesión
      </Link>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-[#448dc9] h-full w-64 py-4 px-6 flex flex-col relative">
            <div className="flex justify-end">
              <button
                onClick={handleMenuToggle}
                className="hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 flex justify-end mb-5 right-0 "
              >
                X
              </button>
            </div>
            <Link
              to="/horses"
              onClick={handleLinkClick}
              className={`transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6 ${
                location.pathname === "/horses" ? "bg-[#2a567a]" : ""
              }`}
            >
              Inicio
            </Link>
            {user && userType === "admin" && (
              <Link
                to="/users"
                onClick={handleLinkClick}
                className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6 ${
                  location.pathname === "/users" ? "bg-[#2a567a]" : ""
                }`}
              >
                Usuarios
              </Link>
            )}
            <Link
              to="/vets"
              onClick={handleLinkClick}
              className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6 ${
                location.pathname === "/vets" ? "bg-[#2a567a]" : ""
              }`}
            >
              Veterinarios
            </Link>
            <Link
              to="/reports"
              onClick={handleLinkClick}
              className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6 ${
                location.pathname === "/reports" ? "bg-[#2a567a]" : ""
              }`}
            >
              Reportes
            </Link>

            <Link
              to={user ? `profile/${user.id}` : "/"}
              onClick={handleLinkClick}
              className={`hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-6 ${
                location.pathname.startsWith("/profile") ? "bg-[#2a567a]" : ""
              }`}
            >
              Perfil
            </Link>
            <Link
              onClick={() => confirmLogout(logout)}
              className="hover:bg-[#2a567a] transition duration-50 rounded-md ease-in-out px-4 py-2 mb-2 mt-auto"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

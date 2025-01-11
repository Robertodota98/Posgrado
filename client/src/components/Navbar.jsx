import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faBars } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const userRole = sessionStorage.getItem("role");

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("role");
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const NavLink = ({ to, children, className }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform translate-y-[-4px] hover:translate-y-0 hover:shadow-lg ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-700"
        } ${className}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/allcursantes" className="flex items-center space-x-3">
              <img src="/coronavirus.png" alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-white font-bold text-xl">POSGRADOS</span>
            </Link>
            <div className="hidden md:flex md:items-center md:space-x-4 ">
              {userRole === "usuario" || userRole === "administrador" && (
                <NavLink to="/allcursantes">
                  Lista de cursantes
                </NavLink>
              )}
              {userRole !== "usuario" && (
                <NavLink to="/create-cursante">
                  Registrar cursantes
                </NavLink>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-300 ease-in-out transform translate-y-[-4px] hover:translate-y-0 hover:shadow-lg ml-4"
            >
              Cerrar sesión
              <FontAwesomeIcon icon={faSignOut} className="ml-2" />
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} mt-2`}>
        <div className="px-2 pt-2 pb-3 space-y-2 bg-gray-800 rounded-md shadow-lg">
          {userRole === "usuario" || userRole === "administrador" && (
            <NavLink to="/allcursantes" className="block w-full">
              Lista de cursantes
            </NavLink>
          )}
          {userRole !== "usuario" && (
            <NavLink to="/create-cursante" className="block w-full">
              Registrar cursantes
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full justify-center transition-all duration-300 ease-in-out transform translate-y-[-4px] hover:translate-y-0 hover:shadow-lg"
          >
            Cerrar sesión
            <FontAwesomeIcon icon={faSignOut} className="ml-2" />
          </button>
        </div>
      </div>
    </nav>
  );
};


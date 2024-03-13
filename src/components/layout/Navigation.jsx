import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow style
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center relative">
        <Link to="/">
          <h1 className="text-xl font-semibold text-gray-800">
            Invoice System
          </h1>
        </Link>
        <button
          className="text-gray-800 inline-flex p-2 rounded md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <nav
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } fixed inset-0 bg-white bg-opacity-95 z-40 flex-col items-center justify-center md:flex md:flex-row md:relative md:bg-transparent md:bg-opacity-100 md:z-auto md:items-center`}
        >
          <Link
            to="/items"
            className="block text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mb-4 md:mb-0 md:mr-4"
          >
            Items
          </Link>
          <Link
            to="/invoices"
            className="block text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mb-4 md:mb-0 md:mr-4"
          >
            Invoices
          </Link>
          <Link
            to="/customers"
            className="block text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
          >
            Customers
          </Link>
          <button
            className="mt-4 md:hidden bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Close
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

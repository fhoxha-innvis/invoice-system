import React from "react";
import { Link } from 'gatsby';

const Navigation = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Invoice System</h1>
        <nav className="space-x-4">
          <Link to="/items" className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out">
                Items
            </Link>
            <Link to="/invoices" className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out">
                Invoices
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

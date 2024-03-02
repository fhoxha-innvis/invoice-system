import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="bg-gray-100">
            <Navigation />
            <div className="container mx-auto px-6">
                {children}
            </div>
            <Footer />
        </div>
    );
};
export default Layout;
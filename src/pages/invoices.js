import React from "react";
import Invoice from "../components/Invoice";

const Invoices = () => {   
    return (
        <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 ">
            <Invoice />
        </div>
        </section>
    );
    }
export default Invoices;
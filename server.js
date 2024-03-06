const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 5000; // Feel free to use any available port

app.use(cors());
app.use(express.json());


//INVOICES
app.get("/api/invoices", async (req, res) => {
  try {
    const response = await fetch(
      "http://sad1.ivaelektronik.com:8081/api/Invoices"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});
app.post("/api/invoices", async (req, res) => {
  try {
    const invoiceData = req.body; // Access the JSON sent in the request body
    const response = await fetch(
      "http://sad1.ivaelektronik.com:8081/api/Invoices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData), // Send the invoice data as JSON
      }
    );

    if (!response.ok) throw new Error("Failed to post data");
    const data = await response.json();
    res.status(201).json(data); // Respond with the created invoice data and a 201 Created status
  } catch (error) {
    console.error("Error posting invoice:", error);
    res.status(500).json({ message: "Failed to post invoice" });
  }
});
app.put("/api/invoices/:invoiceId", async (req, res) => {

  console.log("req.params", req.params);
  console.log("req.body", req.body);
  const { invoiceId } = req.params;
  console.log("invoiceId", invoiceId);
  const invoiceData = req.body;
  console.log("invoiceData", JSON.stringify(invoiceData));

  try {
    const response = await fetch(
      `http://sad1.ivaelektronik.com:8081/api/Invoices/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      }
    );

    if (!response.ok) throw new Error("Failed to update invoice");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Failed to update invoice" });
  }
});

app.get("/api/invoices/:invoiceId", async (req, res) => {
  try {
    // Accessing invoiceId from the route parameter
    const { invoiceId } = req.params;
    const response = await fetch(
      `http://sad1.ivaelektronik.com:8081/api/Invoices/${invoiceId}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    res.status(500).json({ message: "Failed to fetch invoice details" });
  }
});


//ITEMS
app.get("/api/items", async (req, res) => {
  try {
    const response = await fetch(
      "http://sad1.ivaelektronik.com:8081/api/Items"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});

app.get("/api/items/:itemsId", async (req, res) => {
  try {
    // Accessing invoiceId from the route parameter
    const { invoiceId } = req.params;
    const response = await fetch(
      `http://sad1.ivaelektronik.com:8081/api/Items/${itemsId}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    res.status(500).json({ message: "Failed to fetch invoice details" });
  }
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

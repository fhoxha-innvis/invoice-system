const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 5000;
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
    const { itemsId } = req.params;
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

app.post("/api/items", async (req, res) => {
  try {
    const itemDetails = req.body;
    const response = await fetch("http://sad1.ivaelektronik.com:8081/api/Items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemDetails),
    });

    console.log("This is the response from items:", response)

    if (!response.ok) {
      throw new Error(`Failed to create item, status: ${response.status}`);
    }

    const data = await response.json();
    res.status(201).json(data); 
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Failed to create item" });
  }
});
app.delete("/api/items/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const response = await fetch(`http://sad1.ivaelektronik.com:8081/api/Items/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the item');
    }

    console.log(`Item ${itemId} deleted`);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the item' });
  }
});


// CUSTOMERS
app.get("/api/customers", async (req, res) => {
  try {
    const response = await fetch(
      "http://sad1.ivaelektronik.com:8081/api/Customers"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
});

app.post("/api/customers", async (req, res) => {
  try {
    const customerData = req.body;
    const response = await fetch(
      "http://sad1.ivaelektronik.com:8081/api/Customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    if (!response.ok) throw new Error("Failed to post customer");
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error posting customer:", error);
    res.status(500).json({ message: "Failed to post customer" });
  }
});

app.put("/api/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const customerData = req.body;

  try {
    const response = await fetch(
      `http://sad1.ivaelektronik.com:8081/api/Customers/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    if (!response.ok)
      throw new Error(`Failed to update customer ${customerId}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error);
    res
      .status(500)
      .json({ message: `Failed to update customer ${customerId}` });
  }
});

app.delete("/api/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const response = await fetch(
      `http://sad1.ivaelektronik.com:8081/api/Customers/${customerId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok)
      throw new Error(`Failed to delete customer ${customerId}`);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(`Error deleting customer ${customerId}:`, error);
    res
      .status(500)
      .json({ message: `Failed to delete customer ${customerId}` });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

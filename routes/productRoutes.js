const express = require("express");
const router = express.Router();

// In-memory array to store products
let products = [];

// Create a product
router.post("/", (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = {
    id: Date.now().toString(),
    name,
    price,
    description,
    image,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Get all products
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// Get a product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

// Update a product
router.put("/:id", (req, res) => {
  const { name, price, description, image } = req.body;
  let product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update the product
  product = { ...product, name, price, description, image };
  const index = products.findIndex((p) => p.id === req.params.id);
  products[index] = product;

  res.status(200).json(product);
});

// Delete a product
router.delete("/:id", (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1); // Remove the product from the array
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;

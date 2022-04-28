//container import
const ContainerArchivo = require("../Container/ContenedorArchivo");
const cartC = new ContainerArchivo;


//express import
const express = require("express");
const routerCarrito = express.Router();

routerCarrito.post("/cart", async (req, res) => {
  const productInCart = req.body;
  const cart = await cartC.saveCart(productInCart);
  res.json(cart);
});

routerCarrito.delete("/cart/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartC.deleteCartById(id);
  res.json(cart);
});

routerCarrito.get("/cart/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartC.getCartById(id);
  res.json(cart);
});

routerCarrito.post("/cart/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const products = req.body;
  const cartActualizado = await cartC.addProductToCartById(id, products);
  res.json(cartActualizado);
});

routerCarrito.delete("/cart/:id/productos/:productId", async (req, res) => {
  const id = parseInt(req.params.id);
  const productId = parseInt(req.params.productId);
  const cart = await cartC.deleteProductCartById(id, productId);
  res.json(cart);
});

module.exports = routerCarrito
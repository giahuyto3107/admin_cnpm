const express = require("express");
const {
  getAllProducts,
  getDetailProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/product/:id", getDetailProductById);
productRouter.post(
  "/product",
  authenticate,
  authorize([1, 2]),
  createNewProduct
);
productRouter.put(
  "/product/:id",
  authenticate,
  authorize([1, 2]),
  updateProduct
);
productRouter.delete(
  "/product/:id",
  authenticate,
  authorize([1, 2]),
  deleteProduct
);

module.exports = { productRouter };

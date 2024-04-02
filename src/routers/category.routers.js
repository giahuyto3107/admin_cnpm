const express = require("express");
const {
  getAllCategories,
  getDetailCategory,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/category.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/category/:id", getDetailCategory);
categoryRouter.put(
  "/category",
  authenticate,
  authorize([1, 2]),
  createNewCategory
);
categoryRouter.delete(
  "/category/:id",
  authenticate,
  authorize([1, 2]),
  deleteCategoryById
);
categoryRouter.put(
  "/category/:id",
  authenticate,
  authorize([1, 2]),
  updateCategoryById
);

module.exports = { categoryRouter };

const express = require("express");
const {
  getAllAuthors,
  getDetailAuthorById,
  createNewAuthor,
  deleteAuthorById,
  updateAuthorById,
} = require("../controllers/author.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const authorRouter = express.Router();

authorRouter.get("/", getAllAuthors);
authorRouter.get("/author/:id", getDetailAuthorById);
authorRouter.post("/author", authenticate, authorize([1, 2]), createNewAuthor);
authorRouter.delete(
  "/author/:id",
  authenticate,
  authorize([1, 2]),
  deleteAuthorById
);
authorRouter.put(
  "/author/:id",
  authenticate,
  authorize([1, 2]),
  updateAuthorById
);

module.exports = { authorRouter };

const express = require("express");
const {
  createNewSuppliers,
  updateSupplierById,
  getAllSuppliers,
  getDetailSupplierById,
  deleteSupplierById,
} = require("../controllers/suppliers.controllers");
const supplierRouter = express.Router();
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

supplierRouter.post("/supplier", authenticate, authorize([1, 2]), createNewSuppliers);
supplierRouter.get("/", authenticate, authorize([1, 2]), getAllSuppliers);
supplierRouter.get(
  "/supplier/:id",
  authenticate,
  authorize([1, 2]),
  getDetailSupplierById
);
supplierRouter.delete(
  "/supplier/:id",
  authenticate,
  authorize([1, 2]),
  deleteSupplierById
);
supplierRouter.put("/supplier/:id", authenticate, authorize([1, 2]), updateSupplierById);

module.exports = {
  supplierRouter,
};

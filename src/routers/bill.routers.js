const express = require("express");
const {
  getAllBills,
  getDetailBillById,
  getAllBillsByUserId,
  getAllBillsByUser,
  createNewBill,
  updateStatusBillById,
} = require("../controllers/bill.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const billRouter = express.Router();

billRouter.get("/", authenticate, authorize([1, 2]), getAllBills);
billRouter.get("/bill/:id", authenticate, authorize([1, 2]), getDetailBillById);
billRouter.get(
  "/user/:id",
  authenticate,
  authorize([1, 2]),
  getAllBillsByUserId
);
billRouter.get("/current-user", authenticate, getAllBillsByUser);
billRouter.post("/bill", authenticate, createNewBill);
billRouter.put(
  "/bill/:id",
  authenticate,
  authorize([1, 2]),
  updateStatusBillById
);

module.exports = { billRouter };

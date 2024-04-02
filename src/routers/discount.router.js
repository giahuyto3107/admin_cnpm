const express = require('express');
const { authenticate } = require('../middlewares/auth/authenticate');
const { createDiscount, updateDiscoutByDiscount_code, getAllDiscount, getDetailDiscountByDiscount_code, deleteDiscountByDiscount_code } = require('../controllers/discount.controller');
const { authorize } = require("../middlewares/auth/authorize");
const discountRouter = express.Router();

discountRouter.post("/", authenticate, authorize([1, 2]), createDiscount);
discountRouter.put("/:discount_code",authenticate, authorize([1]),updateDiscoutByDiscount_code);
discountRouter.get("/", authenticate, authorize([1, 2]),getAllDiscount);
discountRouter.get("/:discount_code", authenticate, authorize([1, 2]),getDetailDiscountByDiscount_code);
discountRouter.delete("/:discount_code", authenticate, authorize([1, 2]),deleteDiscountByDiscount_code);

module.exports = {
    discountRouter
}
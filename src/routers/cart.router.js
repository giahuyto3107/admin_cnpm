const express=require("express");
const {
    getAllCartAndProductsCart,
    getCartAndProductsCartById,
    createCartById,
    deleteCartById,
    addNewProductOnCartById,
    deleteProductOnCartById,
    updateProductOnCartById,
    deleteAllProductsOnCart
}=require("../controllers/cart.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const cartRouter = express.Router();

cartRouter.get("/",authenticate,authorize([1, 2]),getAllCartAndProductsCart);
cartRouter.post('/cart/:id',authenticate,authorize([1, 2]), createCartById);
cartRouter.delete('/cart/:id',authenticate,authorize([1, 2]), deleteCartById);

cartRouter.get("/cart/:id",authenticate,getCartAndProductsCartById);
cartRouter.post("/cart/products",authenticate,addNewProductOnCartById);
cartRouter.delete("/cart/products/:id",authenticate,deleteProductOnCartById);
cartRouter.delete("/cart/products",authenticate,deleteAllProductsOnCart);
cartRouter.put("/cart/products",authenticate,updateProductOnCartById);

module.exports={cartRouter};
 

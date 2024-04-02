const { getAllCartAndProductsCartServices,
        getCartAndProductsCartByIdServices,
        createCartByIdServices,
        deleteCartByIdServices}=require("../services/cart.servies");
const {addNewProductOnCartServices,
    deleteProductOnCartServices,
    updateProductOnCartServices,
    deleteAllProductsOnCartServices}=require("../services/cart_products.services");
const updateProductOnCartById=async (req,res)=>{
    try {
        const user=req.user;
        const {product_id,quantity}=req.body
        const updateProductsCart= await updateProductOnCartServices(user,{product_id,quantity});
        res.status(updateProductsCart.code).send(updateProductsCart);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const addNewProductOnCartById=async (req,res)=>{
    const user=req.user;
    try {
        const {product_id,quantity}=req.body
        const addProductOnCart= await addNewProductOnCartServices(user,{product_id,quantity});
        res.status(addProductOnCart.code).send(addProductOnCart);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const  deleteProductOnCartById=async (req,res)=>{
    const user=req.user;
    try {
        const product_id=req.params.id;
        const deleteroductOnCart= await  deleteProductOnCartServices(user,product_id);
        res.status(deleteroductOnCart.code).send(deleteroductOnCart);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const  deleteAllProductsOnCart=async (req,res)=>{
    const user=req.user;
    try {
        const deleteALlProductsOnCart= await  deleteProductOnCartServices(user);
        res.status(deleteALlProductsOnCart.code).send(deleteALlProductsOnCart);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const getAllCartAndProductsCart=async (req,res)=>{
    try {
        const getAllCartAndProductsCart= await  getAllCartAndProductsCartServices();
        res.status(getAllCartAndProductsCart.code).send(getAllCartAndProductsCart);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const getCartAndProductsCartById=async (req,res)=>{
    try {
        const {id}=req.params;
        const getCartAndProductsCartById= await  getCartAndProductsCartByIdServices(id);
        res.status(getCartAndProductsCartById.code).send(getCartAndProductsCartById);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const createCartById=async (req,res)=>{
    try {
        const {id}=req.params;
        const createCartById= await createCartByIdServices(id);
        res.status(createCartById.code).send(createCartById);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
const  deleteCartById=async (req,res)=>{
    try {
        const {id}=req.params;
        const  deleteCartById= await  deleteCartByIdServices(id);
        res.status( deleteCartById.code).send(deleteCartById);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
module.exports={
    getAllCartAndProductsCart,
    getCartAndProductsCartById,
    createCartById,
    deleteCartById,
    addNewProductOnCartById,
    deleteProductOnCartById,
    updateProductOnCartById,
    deleteAllProductsOnCart,
}
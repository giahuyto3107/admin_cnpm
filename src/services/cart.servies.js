const { where } = require("sequelize");
const {cart,sequelize}=require("../models");
const {getProductsOnCartByIdServices}=require("../services/cart_products.services");
// Lấy tất cả danh sách cart và danh sách sản phẩm trong cart:admin
const getAllCartAndProductsCartServices=async ()=>{
    try {
        const [listCart]=await sequelize.query(`
        select *
        from carts
        `);
        for(const cart of listCart){
            const cartProducts=await getProductsOnCartByIdServices(cart.user_id);
            cart.cartProducts=cartProducts.content;
        }
        return{
            success:true,
            code:200,
            content:listCart,
        }
    } catch (error) {
        throw error;
    }
}
// Lấy cart và danh sách sản phẩm trong cart:user
const getCartAndProductsCartByIdServices=async (id)=>{
    try {
        const [results, metadata] = await sequelize.query(`
        SELECT * FROM carts WHERE user_id = ${id}
         `);
    
        const checkExist = results[0];
       if(checkExist){
            const cartProducts=await getProductsOnCartByIdServices(checkExist.user_id);
            checkExist.cartProducts=cartProducts.content;
            return { success: true, code: 200, content: checkExist };  
       }
       else{
        return { success: false, code: 200, content: {
            message:"Không tồn tại cart",
        } };  
       }
       
    } catch (error) {
        throw error;
    }
}
// tạo cart với id
const createCartByIdServices = async (id) => {
    try {
        const query = `
            INSERT INTO carts(user_id, total_price, createdAt, updatedAt)
            VALUES(:userId, :totalPrice, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
        await sequelize.query(query, {
            replacements: { userId: id, totalPrice: null },
            type: sequelize.QueryTypes.INSERT
        });

        return {
            success: true,
            code: 201,
            content: {
                message: "Đã tạo giỏ hàng mới thành công"
            }
        };
    } catch (error) {
        throw error;
    }
}
// xóa cart với id
const deleteCartByIdServices=async (id)=>{
    try {
        const checkExist=await sequelize.query(`
          select user_id
          from carts
          where user_id=${id}
        `);
        if(checkExist){
            await cart.destroy({where:{user_id:id}});
            return{
                success: true,
            code: 202,
            content: {
              message:"Đã xóa thành công",
            },
            }
        }
        else{
        return {
            success: false,
            code: 404,
            content: {
                message:"không tồn tại",
            },
          };
        }
    } catch (error) {
        throw error
    }
}
module.exports={
    getAllCartAndProductsCartServices,
    getCartAndProductsCartByIdServices,
    createCartByIdServices,
    deleteCartByIdServices,
}


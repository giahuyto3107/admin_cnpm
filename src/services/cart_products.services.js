const { Sequelize } = require("sequelize");
const {cart_products,Product,User,sequelize}= require("../models");
// function check quantity
const checkValidProduct=async (productId,quantityAdd)=>{
    try {
        const product=await Product.findOne({where:{id:productId}});
        if (!product) {
            return  false;
  
        }
        if (product.quantity >= quantityAdd) {
            return  true;
        } else {
            return 
                 false;
        }
    } catch (error) {
        console.error("Error checking quantity:", error);
        return 
            valid: false;
 
    }
};
// thêm một sản phẩm vào giỏ hàng của khách hàng có user id :user
const addNewProductOnCartServices=async(user,data)=>{
    const {email}=user;
    const{product_id,quantity}=data;
    try {
        const checkExist=await User.findOne({where:{email}});
        if(checkExist){
            if(await checkValidProduct(product_id,quantity)){
                await sequelize.query(`
                INSERT INTO cart_products(user_id, product_id, quantity, createdAt, updatedAt)
                VALUES(:userId, :productId, :quantity, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, {
                replacements: { userId: checkExist.id, productId: product_id, quantity: quantity },
                type: sequelize.QueryTypes.INSERT
                });
                await sequelize.query(`
                UPDATE carts
                SET total_price = (
                    SELECT SUM(products.price * cart_products.quantity)
                    FROM cart_products
                    INNER JOIN products ON products.id = cart_products.product_id
                    WHERE cart_products.user_id = :userId
                )
                WHERE user_id = :userId
            `, {
                replacements: { userId: checkExist.id },
                type: sequelize.QueryTypes.UPDATE
                });

                return{
                    success:true,
                    code:200,
                    content: {message: "Đã thêm sản phẩm vào giỏ hàng",},
                }
            }
           else{
            return{
                success:false,
                code:400,
                content: { message: "Không thể thêm sản phẩm",},
            }
           }
        }else{
            return {
                success: false,
                code: 404,
                content: { message: "Hệ thống không tìm thấy người dùng này",},
              };
        }
    } catch (error) {
        throw error;
    }
};
// xóa sản phẩm khỏi giỏ hàng: user
const deleteProductOnCartServices=async (user,product_id)=>{
    const {email}=user;
    try {
        const checkExist=await User.findOne({where:{email}});
        if(checkExist){
            await sequelize.query(`
                delete from cart_products
                where cart_products.product_id=${product_id} and cart_products.user_id=${checkExist.id}
            `);
            await sequelize.query(`
            UPDATE carts
            SET total_price = (
                SELECT SUM(products.price * cart_products.quantity)
                FROM cart_products
                INNER JOIN products ON products.id = cart_products.product_id
                WHERE cart_products.user_id = :userId
            )
            WHERE user_id = :userId
            `, {
            replacements: { userId: checkExist.id },
            type: sequelize.QueryTypes.UPDATE
        });
        
            return{
                success:true,
                code:200,
                content: {message: "Đã xóa sản phẩm thành công",},
            }
        }
        else{
            return {
                success: false,
                code: 404,
                content: {message: "Hệ thống không tìm thấy người dùng này",},
              };
        }
    } catch (error) {
        throw error;
    }
}
// xóa tất cả products trong cart
const deleteAllProductsOnCartServices=async (user)=>{
    const {email}=user;
    try {
        const checkExist=await User.findOne({where:{email}});
        if(checkExist){
            await sequelize.query(`
                delete from cart_products
                where cart_products.user_id=${checkExist.id}
            `);
            await sequelize.query(`
            UPDATE carts
            SET total_price = (
                SELECT SUM(products.price * cart_products.quantity)
                FROM cart_products
                INNER JOIN products ON products.id = cart_products.product_id
                WHERE cart_products.user_id = :userId
            )
            WHERE user_id = :userId
            `, {
            replacements: { userId: checkExist.id },
            type: sequelize.QueryTypes.UPDATE
        });
        
            return{
                success:true,
                code:200,
                content: {message: "Đã xóa tất cả sản phẩm thành công",},
            }
        }
        else{
            return {
                success: false,
                code: 404,
                content: {message: "Hệ thống không tìm thấy người dùng này",},
              };
        }
    } catch (error) {
        throw error;
    }
}
// lấy danh sách các sản phẩm trong giỏ hàng của khách hàng : user/admin
const getProductsOnCartByIdServices=async(id)=>{
    try {
        const checkExist=await User.findOne({where:{id}});
        if(checkExist){
            const[listProducts]=await sequelize.query(`
            SELECT p.image, 
            cp.quantity, 
            p.price * cp.quantity AS total, 
            p.name
            FROM carts c
            INNER JOIN cart_products cp ON c.user_id = cp.user_id
            INNER JOIN products p ON p.id = cp.product_id
            WHERE c.user_id = ${id};
            `);
            return{
                success:true,
                code:200,
                content: {
                    listProducts
                },
            }
        }
        else{
            return {
                success: false,
                code: 404,
                content: { message: "Hệ thống không tìm thấy người dùng này",},
            };
        }
    } catch (error) {
        throw error;
    }
}
// chỉnh sửa sô lượng sản phẩm trong giỏ hàng của khách hàng:user
const updateProductOnCartServices=async(user,data)=>{
    const {email}=user;
    try {
        const {product_id,quantity}=data;
    if(await checkValidProduct(product_id,quantity)){
        const userCart= User.findOne({where:{email}});
        const checkExist=await cart_products.findOne({where:{user_id:userCart.id,product_id}});
        if(checkExist){
            checkExist.quantity=quantity;
            await checkExist.save();
            return {
                success: true,
                code: 200,
                content: {message:"Đã thay đổi số lượng sản phẩm trong giỏ hàng",},
             }  
        }
        else{
            return {
                success: false,
                code: 404,
                content: {message:"Không tìm thấy dữ liệu cụ thể để thay đổi",},
             }
        }
    }
    else{
        return{
            success:false,
            code:400,
            content: { message: "không thể chỉnh sửa do số lượng không phù hợp",},
        }
    }
    } catch (error) {
        throw error;
    }
    
}
// lấy danh sách tất cả các giỏ hàng của khách hàng: admin
// const getAllCartServices=async()=>{
//     try {
//             const[listCartUser]=await sequelize.query(`
//             SELECT c.id, 
//             c.total_price, 
//             SUM(cp.quantity) AS quantity_product
//             FROM cart c
//             INNER JOIN cart_products cp ON c.user_id = cp.user_id
//             INNER JOIN products p ON p.product_id = cp.product_id
//             GROUP BY c.id, c.total_price;
//             `);
//             return{
//                 success:true,
//                 code:200,
//                 content: {
//                     listCartUser
//                 },
//             }
//         }
//      catch (error) {
//         throw error;
//     }
// }

module.exports={
    addNewProductOnCartServices,
    deleteProductOnCartServices,
    getProductsOnCartByIdServices,
    updateProductOnCartServices,
    deleteAllProductsOnCartServices
}
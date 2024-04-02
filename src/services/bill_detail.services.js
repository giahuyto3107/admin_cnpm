const { sequelize } = require("../models");

// Lấy chi tiết một chi tiết hoá đơn
const getDetailBillDetailByIdServices = async (id) => {
  try {
    const [billDetails] = await sequelize.query(`
      SELECT 
        p.id as product_id,
        p.name as product_name, 
        p.image as product_image,
        bd.quantity, 
        bd.price, 
        bd.quantity * bd.price total_price
      FROM bill_details bd INNER JOIN products p ON bd.product_id = p.id
      WHERE bill_id = ${id}
    `);

    return billDetails;
  } catch (error) {
    throw error;
  }
};

// Tạo một chi tiết hoá đơn của một hoá đơn
const createNewBillDetailServices = async (bill_id, bill_details) => {
  try {
    for (const billDetail of bill_details) {
      await sequelize.query(`
        INSERT INTO bill_details (bill_id, product_id, quantity, price)
        VALUES (${bill_id}, ${billDetail.product_id}, ${billDetail.quantity}, ${billDetail.price})
      `);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDetailBillDetailByIdServices,
  createNewBillDetailServices,
};

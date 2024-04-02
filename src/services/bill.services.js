const { Bill, User, sequelize } = require("../models");
const {
  getDetailBillDetailByIdServices,
  createNewBillDetailServices,
} = require("../services/bill_detail.services");
const {
  updateQuantityProductServices,
} = require("../services/product.services");

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn: admin
const getAllBillsServices = async () => {
  try {
    const [bills] = await sequelize.query(`
    SELECT 
      b.id,
 	    u.email,
      u.fullname,
      u.phone_number,
      b.date_create,
      b.total_price,
      b.address,
      b.payment_method,
      b.discount_code,
      bs.status
    FROM 
      bills b 
    INNER JOIN 
      bill_details bd ON b.id = bd.bill_id
    INNER JOIN 
      bill_statuses bs ON b.bill_status_id = bs.id  
    INNER JOIN
      users u ON b.user_id = u.id
    GROUP BY
      b.id;
    `);

    // Lấy chi tiết hoá đơn
    for (const bill of bills) {
      const billDetails = await getDetailBillDetailByIdServices(bill.id);
      bill.bill_details = billDetails;
    }

    return { success: true, code: 200, content: bills };
  } catch (error) {
    throw error;
  }
};

// Lấy một hoá đơn, chi tiết hoá đơn: admin/user
const getDetailBillByIdServices = async (id) => {
  try {
    const isExistBill = await Bill.findOne({ where: { id } });
    if (!isExistBill) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Hệ thống không tìm thấy hoá đơn này",
        },
      };
    }

    const [bill] = await sequelize.query(`
      SELECT 
        b.id,
        u.email,
        u.fullname,
        u.phone_number,
        b.date_create,
        b.total_price,
        b.address,
        b.payment_method,
        b.discount_code,
        bs.status
      FROM 
        bills b 
      INNER JOIN 
        bill_details bd ON b.id = bd.bill_id
      INNER JOIN 
        bill_statuses bs ON b.bill_status_id = bs.id  
      INNER JOIN
        users u ON b.user_id = u.id
      WHERE b.id = ${id}
      GROUP BY
        b.id;`);

    // Lấy chi tiết hoá đơn
    const billDetails = await getDetailBillDetailByIdServices(bill[0].id);
    bill[0].bill_details = billDetails;

    return {
      success: true,
      code: 200,
      content: bill,
    };
  } catch (error) {
    throw error;
  }
};

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn của một người: admin
const getAllBillsByUserIdServices = async (id) => {
  try {
    const isExistUser = await User.findOne({ where: { id } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy người dùng này" },
      };
    }

    const [bills] = await sequelize.query(`
    SELECT 
        b.id,
        u.email,
        u.fullname,
        u.phone_number,
        b.date_create,
        b.total_price,
        b.address,
        b.payment_method,
        bs.status
      FROM 
        bills b 
      INNER JOIN 
        bill_details bd ON b.id = bd.bill_id
      INNER JOIN 
        bill_statuses bs ON b.bill_status_id = bs.id  
      INNER JOIN 
        discounts d ON b.discount_code = d.discount_code
      INNER JOIN
        users u ON b.user_id = u.id
      WHERE b.user_id = ${id}
      GROUP BY
        b.id;`);

    // Lấy chi tiết hoá đơn
    for (const bill of bills) {
      const billDetails = await getDetailBillDetailByIdServices(bill.id);
      bill.bill_details = billDetails;
    }
    return { success: true, code: 200, content: bills };
  } catch (error) {
    throw error;
  }
};

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn của một người: user
const getAllBillsByUserServices = async (user) => {
  const { email } = user;
  try {
    const isExistUser = await User.findOne({ where: { email } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy người dùng này" },
      };
    }

    const [bills] = await sequelize.query(`
    SELECT 
        b.id,
        u.email,
        u.fullname,
        u.phone_number,
        b.date_create,
        b.total_price,
        b.address,
        b.payment_method,
        b.discount_code,
        bs.status
      FROM 
        bills b 
      INNER JOIN 
        bill_details bd ON b.id = bd.bill_id
      INNER JOIN 
        bill_statuses bs ON b.bill_status_id = bs.id  
      INNER JOIN
        users u ON b.user_id = u.id
      WHERE b.user_id = ${isExistUser.id}
      GROUP BY
        b.id;`);

    if (bills.length == 0) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Hệ thống không tìm thấy đơn hàng của người dùng này",
        },
      };
    }
    // Lấy chi tiết hoá đơn
    for (const bill of bills) {
      const billDetails = await getDetailBillDetailByIdServices(bill.id);
      bill.bill_details = billDetails;
    }
    return { success: true, code: 200, content: bills };
  } catch (error) {
    throw error;
  }
};

// Tạo một đơn hàng: user
const createNewBillServices = async (user, data) => {
  const { email } = user;
  const { total_price, address, payment_method, discount_code, bill_details } =
    data;
  try {
    const isExistUser = await User.findOne({ where: { email } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy người dùng này" },
      };
    }

    // Ghi dữ liệu vào bảng bill
    const newBill = await Bill.create({
      user_id: isExistUser.id,
      staff_id: null,
      date_create: new Date(),
      total_price,
      address,
      payment_method,
      bill_status_id: 1,
      discount_code,
    });
    // Ghi dữ liệu vào bảng bill_detail
    await createNewBillDetailServices(newBill.id, bill_details);

    return {
      success: true,
      code: 201,
      content: { message: "Hệ thống đã tạo hoá đơn thành công" },
    };
  } catch (error) {
    throw error;
  }
};

// Cập nhật một đơn hàng: staff
const updateStatusBillByIdServices = async (id, bill_status_id) => {
  try {
    const isExistBill = await Bill.findOne({ where: { id } });
    if (!isExistBill) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Hệ thống không tìm thấy hoá đơn này",
        },
      };
    }

    // Nếu id = 2, tức là Đã duyệt thì trừ số lượng trong kho
    if (isExistBill.bill_status_id == 1 && bill_status_id == 2) {
      // Thay đổi số lượng của từng sản phẩm (trừ đi)
      const billDetails = await getDetailBillDetailByIdServices(id);
      for (const billDetail of billDetails) {
        await updateQuantityProductServices(
          billDetail.product_id,
          -billDetail.quantity
        );
      }
    }

    isExistBill.bill_status_id = bill_status_id;
    await isExistBill.save();
    return {
      success: true,
      code: 201,
      content: {
        message: "Hệ thống đã cập nhật thành công trạng thái hoá đơn",
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBillsServices,
  getDetailBillByIdServices,
  getAllBillsByUserIdServices,
  getAllBillsByUserServices,
  createNewBillServices,
  updateStatusBillByIdServices,
};

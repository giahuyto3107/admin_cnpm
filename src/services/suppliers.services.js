const { Suppliers, sequelize } = require("../models");

//Tạo một nhà cung cấp
const createNewSuppliersServies = async (data) => {
  try {
    const { name, email, phone_number } = data;
    const newSupp = await Suppliers.create({ name, email, phone_number });
    return {
      success: true,
      code: 201,
      content: {
        name: newSupp.name,
        email: newSupp.email,
        phonenumber: newSupp.phone_number,
      },
    };
  } catch (error) {
    throw error;
  }
};
// lấy một nhà cung cấp
const getDetailSupplierByIdServies = async (id) => {
  try {
    const supplier = await Suppliers.findOne({ where: { id } });
    if (supplier) {
      return {
        success: true,
        code: 200,
        content: {
          supplier,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy nhà cung cấp",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};
// lấy toàn bộ các nhà cung cấp
const getAllSuppliersServies = async () => {
  try {
    const suppliersList = await Suppliers.findAll();
    if (suppliersList) {
      return {
        success: true,
        code: 200,
        content: {
          suppliersList,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại nhà cung cấp nào",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};
// xóa một nhà cung cấp thông qua id
const deleteSupplierByIdServies = async (id) => {
  try {
    const checkExist = await Suppliers.findOne({ where: { id } });
    if (checkExist) {
      await Suppliers.destroy({ where: { id } });
      return {
        success: true,
        code: 200,
        content: {
          message: "Đã xóa thành công nhà cung cấp khỏi hệ thống",
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại nhà cung cấp để xóa",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};
// update thông tin nhà cung cấp
const updateSupplierByIdServices = async (id, data) => {
  try {
    const { name, email, phonenumber } = data;
    const checkExist = await Suppliers.findOne({ where: { id } });
    if (checkExist) {
      checkExist.name = name;
      checkExist.email = email;
      checkExist.phonenumber = phonenumber;
      await checkExist.save();
      return {
        success: true,
        code: 200,
        content: {
          checkExist,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại nhà cung cấp để chỉnh sửa",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateSupplierByIdServices,
  deleteSupplierByIdServies,
  getAllSuppliersServies,
  getDetailSupplierByIdServies,
  createNewSuppliersServies,
};

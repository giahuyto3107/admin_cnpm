const { Category, sequelize } = require("../models");

// Lấy chi tiết một thể loại
const getDetailCategoryServices = async (id) => {
  try {
    const category = await Category.findOne({ where: { id } });
    if (category) {
      return { success: true, code: 200, content: category };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy thể loại này" },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Thêm một thể loại: Admin
const createNewCategoryServices = async (data) => {
  const { name, image } = data;
  try {
    const newCategory = await Category.create({ name, image });
    return {
      success: true,
      code: 201,
      content: {
        id: newCategory.id,
        name: newCategory.name,
        image: newCategory.image,
        updatedAt: newCategory.updatedAt,
        createdAt: newCategory.createdAt,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Xoá một thể loại: Admin
const deleteCategoryByIdServices = async (id) => {
  try {
    const isExistCategory = await Category.findOne({ where: { id } });
    if (isExistCategory) {
      // Xoá thể loại ở bảng Product_Category, rồi mới xoá ở bảng Category
      await sequelize.query(`
        DELETE FROM product_categories
        WHERE category_id = ${id}
      `);
      await isExistCategory.destroy();
      return {
        success: true,
        code: 200,
        content: { message: "Hệ thống đã xoá thành công thể loại này" },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm được thể loại này" },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Chỉnh sửa một thể loại: Admin
const updateCategoryByIdServices = async (id, data) => {
  const { name, image } = data;
  try {
    const isExistCategory = await Category.findOne({ where: { id } });
    if (isExistCategory) {
      isExistCategory.name = name;
      isExistCategory.image = image;
      await isExistCategory.save();
      return {
        success: true,
        code: 200,
        content: { message: "Hệ thống cập nhật thành công thể loại này" },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy thể loại cần cập nhật" },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDetailCategoryServices,
  createNewCategoryServices,
  deleteCategoryByIdServices,
  updateCategoryByIdServices,
};

const { Category } = require("../models");
const {
  getDetailCategoryServices,
  createNewCategoryServices,
  deleteCategoryByIdServices,
  updateCategoryByIdServices,
} = require("../services/category.services");

// Lấy tất cả thể loại
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ success: true, code: 200, content: categories });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Lấy chi tiết một thể loại
const getDetailCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryResult = await getDetailCategoryServices(id);
    res.status(categoryResult.code).send(categoryResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Tạo category mới: admin
const createNewCategory = async (req, res) => {
  const data = req.body;
  try {
    const createNewCategoryResult = await createNewCategoryServices(data);
    res.status(createNewCategoryResult.code).send(createNewCategoryResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Xoá category by id: admin
const deleteCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCategoryByIdResult = await deleteCategoryByIdServices(id);
    res.status(deleteCategoryByIdResult.code).send(deleteCategoryByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Cập nhật thể loại: admin
const updateCategoryById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateCategoryByIdResult = await updateCategoryByIdServices(id, data);
    res.status(updateCategoryByIdResult.code).send(updateCategoryByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

module.exports = {
  getAllCategories,
  getDetailCategory,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
};

const { Author } = require("../models");

// Lấy toàn bộ danh sách tác giả
const getAllAuthorsServices = async () => {
  try {
    const authors = await Author.findAll();
    return { success: true, code: 200, content: authors };
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết một tác giả
const getDetailAuthorByIdServices = async (id) => {
  try {
    const isExistAuthor = await Author.findOne({ where: { id } });
    if (isExistAuthor) {
      return {
        success: true,
        code: 200,
        content: {
          id: isExistAuthor.id,
          name: isExistAuthor.name,
          updatedAt: isExistAuthor.updatedAt,
          createdAt: isExistAuthor.createdAt,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy tác giả này" },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Tạo mới một tác giả: admin
const createNewAuthorServices = async (data) => {
  const { name } = data;
  try {
    const newAuthor = await Author.create({ name });
    return { success: true, code: 201, content: newAuthor };
  } catch (error) {
    throw error;
  }
};

// Xoá một tác giả: admin
const deleteAuthorByIdServices = async (id) => {
  try {
    const isExistAuthor = await Author.findOne({ where: { id } });
    if (isExistAuthor) {
      await isExistAuthor.destroy();
      return {
        success: true,
        code: 200,
        content: { message: "Hệ thống đã xoá tác giả này thành công" },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy tác giả này" },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin tác giả: admin
const updateAuthorByIdServices = async (id, data) => {
  const { name } = data;
  try {
    const isExistAuthor = await Author.findOne({ where: { id } });
    if (isExistAuthor) {
      isExistAuthor.name = name;
      await isExistAuthor.save();
      return {
        success: true,
        code: 201,
        content: {
          id: isExistAuthor.id,
          name: isExistAuthor.name,
          updatedAt: isExistAuthor.updatedAt,
          createdAt: isExistAuthor.createdAt,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy tác giả này" },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAuthorsServices,
  getDetailAuthorByIdServices,
  createNewAuthorServices,
  deleteAuthorByIdServices,
  updateAuthorByIdServices,
};

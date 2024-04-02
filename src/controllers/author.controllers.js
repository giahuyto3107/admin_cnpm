const {
  getAllAuthorsServices,
  getDetailAuthorByIdServices,
  createNewAuthorServices,
  deleteAuthorByIdServices,
  updateAuthorByIdServices,
} = require("../services/author.services");

// Lấy toàn bộ danh sách tác giả
const getAllAuthors = async (req, res) => {
  try {
    const getAllAuthorsResult = await getAllAuthorsServices();
    res.status(getAllAuthorsResult.code).send(getAllAuthorsResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Lấy chi tiết một tác giả
const getDetailAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    const getDetailAuthorByIdResult = await getDetailAuthorByIdServices(id);
    res.status(getDetailAuthorByIdResult.code).send(getDetailAuthorByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Tạo mới một tác giả: admin
const createNewAuthor = async (req, res) => {
  const data = req.body;
  try {
    const createNewAuthorResult = await createNewAuthorServices(data);
    res.status(createNewAuthorResult.code).send(createNewAuthorResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Xoá một tác giả: admin
const deleteAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteAuthorByIdResult = await deleteAuthorByIdServices(id);
    res.status(deleteAuthorByIdResult.code).send(deleteAuthorByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Cập nhật thông tin tác giả: admin
const updateAuthorById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateAuthorByIdResult = await updateAuthorByIdServices(id, data);
    res.status(updateAuthorByIdResult.code).send(updateAuthorByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

module.exports = {
  getAllAuthors,
  getDetailAuthorById,
  createNewAuthor,
  deleteAuthorById,
  updateAuthorById,
};

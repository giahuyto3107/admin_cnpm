const {
  getAllProductsServices,
  getDetailProductByIdServices,
  createNewProductServices,
  updateProductServices,
  deleteProductServices,
  searchProductsByKeywordServices,
} = require("../services/product.services");

const getAllProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const getAllProductsResult = await getAllProductsServices(search);
    res.status(getAllProductsResult.code).send(getAllProductsResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const getDetailProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const getDetailProductByIdResult = await getDetailProductByIdServices(id);
    res
      .status(getDetailProductByIdResult.code)
      .send(getDetailProductByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const createNewProduct = async (req, res) => {
  const data = req.body;
  try {
    const createNewProductServicesResult = await createNewProductServices(data);
    res
      .status(createNewProductServicesResult.code)
      .send(createNewProductServicesResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateProductResult = await updateProductServices(id, data);
    res.status(updateProductResult.code).send(updateProductResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProductResult = await deleteProductServices(id);
    res.status(deleteProductResult.code).send(deleteProductResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

module.exports = {
  getAllProducts,
  getDetailProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};

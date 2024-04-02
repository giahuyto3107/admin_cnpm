const {
  getAllBillsServices,
  getDetailBillByIdServices,
  getAllBillsByUserIdServices,
  getAllBillsByUserServices,
  createNewBillServices,
  updateStatusBillByIdServices,
} = require("../services/bill.services");

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn: admin
const getAllBills = async (req, res) => {
  try {
    const getAllBillsResult = await getAllBillsServices();
    res.status(getAllBillsResult.code).send(getAllBillsResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Lấy một hoá đơn, chi tiết hoá đơn: admin/user
const getDetailBillById = async (req, res) => {
  const id = req.params.id;
  try {
    const getDetailBillByIdResult = await getDetailBillByIdServices(id);
    res.status(getDetailBillByIdResult.code).send(getDetailBillByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn của một người: admin
const getAllBillsByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const getAllBillsUserIdResult = await getAllBillsByUserIdServices(id);
    res.status(getAllBillsUserIdResult.code).send(getAllBillsUserIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Lấy toàn bộ hoá đơn, chi tiết hoá đơn của một người: user
const getAllBillsByUser = async (req, res) => {
  const user = req.user;
  try {
    const getAllBillsByUserResult = await getAllBillsByUserServices(user);
    res.status(getAllBillsByUserResult.code).send(getAllBillsByUserResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Tạo một đơn hàng: user
const createNewBill = async (req, res) => {
  const user = req.user;
  const data = req.body;
  try {
    const createNewBillResult = await createNewBillServices(user, data);
    res.status(createNewBillResult.code).send(createNewBillResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Cập nhật một đơn hàng: staff
const updateStatusBillById = async (req, res) => {
  const { id } = req.params;
  const { bill_status_id } = req.body;
  try {
    const updateStatusBillByIdResult = await updateStatusBillByIdServices(
      id,
      bill_status_id
    );
    res
      .status(updateStatusBillByIdResult.code)
      .send(updateStatusBillByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

module.exports = {
  getAllBills,
  getDetailBillById,
  getAllBillsByUserId,
  getAllBillsByUser,
  createNewBill,
  updateStatusBillById,
};

const {
  updateSupplierByIdServices,
  deleteSupplierByIdServies,
  getAllSuppliersServies,
  getDetailSupplierByIdServies,
  createNewSuppliersServies,
} = require("../services/suppliers.services");
// chỉnh sửa nhà cung cấp
const updateSupplierById=async (req,res)=>{
    try {
        const {id}=req.params;
        const {name, email, phone_number}=req.body
        const updateSupplier= await updateSupplierByIdServices(id,{name, email, phone_number});
        res.status(updateSupplier.code).send(updateSupplier);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
}
// xóa nhà cung cấp
const deleteSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSupplier = await deleteSupplierByIdServies(id);
    res.status(deleteSupplier.code).send(deleteSupplier);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};
// lấy tất cả nhà cung cấp
const getAllSuppliers = async (req, res) => {
  try {
    const getAllSuppliers = await getAllSuppliersServies();
    res.status(getAllSuppliers.code).send(getAllSuppliers);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};
// lấy một nhà cung cấp
const getDetailSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetailSupplier = await getDetailSupplierByIdServies(id);
    res.status(getDetailSupplier.code).send(getDetailSupplier);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};
// tạo một nhà cung cấp
const createNewSuppliers=async (req,res)=>{
    try {
        const {name, email, phone_number}= req.body
        const createNewSupplier=await  createNewSuppliersServies({name, email, phone_number});
        res.status(createNewSupplier.code).send(createNewSupplier);
    } catch (error) {
        res.status(500).send({success:false,code:500,content:{message:error.message}});
    }
}

module.exports = {
  createNewSuppliers,
  updateSupplierById,
  getAllSuppliers,
  getDetailSupplierById,
  deleteSupplierById,
};

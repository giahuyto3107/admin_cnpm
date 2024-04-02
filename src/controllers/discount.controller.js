const { create, update, getALL, getDiscountByDiscount_code,deleteByDiscount_code } = require("../services/discount.services");

const createDiscount = async (req, res) => {
    try {
        const {discount_code ,discount_value, type, begin_date, finish_date} = req.body;
        const newDiscount = await create(discount_code ,discount_value, type, begin_date, finish_date);
        res.status(newDiscount.code).send(newDiscount);
    } catch (error) {
        res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
    }
};

const updateDiscoutByDiscount_code = async (req, res) => {

    try {
        const{discount_code} = req.params;
        const{discount_value, type, begin_date, finish_date} = req.body;
        const discountUpdated = await update(discount_code,discount_value, type, begin_date, finish_date);
        res.status(discountUpdated.code).send(discountUpdated);
    } catch (error) {
        res.status(500).send({ success: false, code: 500, content: { message: error.message } });
    }
};

const getAllDiscount = async (req, res) => {
    try {
      const discountList = await getALL();
      res.status(discountList.code).send(discountList);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, code: 500, content: { message: error.message } });
    }
  };

  const getDetailDiscountByDiscount_code = async (req, res) => {
    try {
      const { discount_code } = req.params;
      const discount = await getDiscountByDiscount_code(discount_code);
      res.status(discount.code).send(discount);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, code: 500, content: { message: error.message } });
    }
  };

  const deleteDiscountByDiscount_code = async (req, res) => {
    try {
      const { discount_code } = req.params;
      const deleteDiscount = await deleteByDiscount_code(discount_code);
      res.status(deleteDiscount.code).send(deleteDiscount);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, code: 500, content: { message: error.message } });
    }
  };


module.exports =  {
    createDiscount,
    updateDiscoutByDiscount_code,
    getAllDiscount,
    getDetailDiscountByDiscount_code,
    deleteDiscountByDiscount_code
}
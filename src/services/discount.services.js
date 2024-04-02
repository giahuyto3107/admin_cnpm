const { Discount } = require("../models");

const create = async (
  discount_code,
  discount_value,
  type,
  begin_date,
  finish_date
) => {
  try {
    const newDiscount = await Discount.create({
      discount_code,
      discount_value,
      type,
      begin_date,
      finish_date,
    });
    return {
      success: true,
      code: 200,
      content: {
        newDiscount,
      },
    };
  } catch (error) {
    throw error;
  }
};

const update = async (
  discount_code,
  discount_value,
  type,
  begin_date,
  finish_date
) => {
  try {
    const discount = await Discount.findOne({
      where: {
        discount_code,
      },
    });
    if (discount) {
      (discount.discount_value = discount_value),
        (discount.type = type),
        (discount.begin_date = begin_date),
        (discount.finish_date = finish_date);
      await discount.save();
      return {
        success: true,
        code: 200,
        content: {
          discount,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại mã giảm giá để chỉnh sửa",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const getALL = async () => {
  try {
    const discountList = await Discount.findAll();
    if (discountList) {
      return {
        success: true,
        code: 200,
        content: {
          discountList,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại mã giảm giá nào",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const getDiscountByDiscount_code = async (discount_code) => {
  try {
    const discount = await Discount.findOne({ where: { discount_code } });
    if (discount) {
      return {
        success: true,
        code: 200,
        content: {
          discount,
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy mã giảm giá",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const deleteByDiscount_code = async (discount_code) => {
  try {
    const discount = await Discount.findOne({ where: { discount_code } });
    if (discount) {
      await Discount.destroy({ where: { discount_code } });
      return {
        success: true,
        code: 200,
        content: {
          message: "Đã xóa thành công mã giảm giá khỏi hệ thống",
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tồn tại mã giảm giá để xóa",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  update,
  getALL,
  getDiscountByDiscount_code,
  deleteByDiscount_code,
};

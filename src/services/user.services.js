const { User } = require("../models");
const {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
} = require("./jwt.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Tạo tài khoản người dùng
const registerUser = async (newUser) => {
  const { email, password, role_id } = newUser;
  try {
    const isExistUser = await User.findOne({
      where: {
        email,
      },
    });

    // Nếu đã tồn tại tài khoản
    if (isExistUser) {
      return {
        success: false,
        code: 500,
        content: { message: "Hệ thống đã tồn tại email này" },
      };
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        email,
        password: hash,
        role_id,
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      return {
        success: true,
        code: 201,
        content: {
          id: newUser.id,
          email: newUser.email,
          role_id: newUser.role_id,
          updatedAt: newUser.updatedAt,
          createdAt: newUser.createdAt,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

//Đăng nhập tài khoản vào hệ thống
const loginUser = async (userLogin) => {
  const { email, password } = userLogin;
  try {
    // Kiểm tra user có tồn tại hay không?
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Nếu tồn tại
    if (user) {
      const isAuth = bcrypt.compareSync(password, user.password);
      if (isAuth) {
        // const token = jwt.sign(
        //   { email: user.email, role_id: user.role_id },
        //   "minhlq",
        //   {
        //     expiresIn: "30s",
        //   }
        // );
        const access_token = await genneralAccessToken({
          email: user.email,
          role_id: user.role_id,
        });

        const refresh_token = await genneralRefreshToken({
          email: user.email,
          role_id: user.role_id,
        });

        return {
          success: true,
          code: 200,
          content: {
            message: "Đăng nhập thành công",
            access_token,
            refresh_token,
          },
        };
      } else {
        return {
          success: false,
          code: 500,
          content: {
            message: "Tài khoản hoặc mật khẩu không đúng",
          },
        };
      }
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Không tìm thấy tài khoản" },
      };
    }
  } catch (error) {
    throw error;
  }
};

//Cập nhật thông tin người dùng: admin
const updateUserByIdServices = async (id, user) => {
  const { email, fullname, address, phone_number, avatar_image } = user;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy thông tin người dùng" },
      };
    }

    const isExistEmailUser = await User.findOne({
      where: { email },
    });
    if (isExistEmailUser && user.email != isExistEmailUser.email) {
      return {
        success: false,
        code: 500,
        content: { message: "Hệ thống đã tồn tại email người dùng" },
      };
    } else {
      user.email = email;
      user.fullname = fullname;
      user.address = address;
      user.phone_number = phone_number;
      user.avatar_image = avatar_image;
      await user.save();
    }

    return {
      success: true,
      code: 200,
      content: { message: "Cập nhật thành công thông tin người dùng" },
    };
  } catch (error) {
    throw error;
  }
};

//Cập nhật thông tin người dùng: user
const updateUserServices = async (user, data) => {
  const { email, fullname, address, phone_number, avatar_image } = data;

  try {
    const isExistUser = await User.findOne({ where: { email: user.email } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy thông tin người dùng",
        },
      };
    }

    const isExistEmailUser = await User.findOne({
      where: { email },
    });
    if (isExistEmailUser && user.email != isExistEmailUser.email) {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống đã tồn tại email người dùng" },
      };
    } else {
      isExistUser.email = email;
      isExistUser.fullname = fullname;
      isExistUser.address = address;
      isExistUser.phone_number = phone_number;
      isExistUser.avatar_image = avatar_image;
      await isExistUser.save();
    }

    return {
      success: true,
      code: 200,
      content: {
        message: "Cập nhật thành công thông tin người dùng",
      },
    };
  } catch (error) {
    throw error;
  }
};

//Xóa tài khoản : Admin
const deleteUserServices = async (id) => {
  try {
    const isExistUser = await User.findOne({ where: { id } });

    if (isExistUser) {
      await isExistUser.destroy();
      return {
        success: true,
        code: 200,
        content: { message: "Đã xoá thành công tài khoản" },
      };
    } else {
      return {
        success: false,
        code: 500,
        message: "Không tìm thấy tài khoản cần xoá",
      };
    }
  } catch (error) {
    throw error;
  }
};

//lấy thông tin chi tiết người dùng: Admin
const getDetailUserByIdServices = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return {
      success: true,
      code: 200,
      content: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Đổi mật khẩu: User
const changePasswordServices = async (user, password) => {
  try {
    const isExistUser = await User.findOne({ where: { email: user.email } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy thông tin người dùng",
        },
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    isExistUser.password = hash;
    isExistUser.updatedAt = new Date();
    await isExistUser.save();

    return {
      success: true,
      code: 200,
      content: { message: "Thay đổi mật khẩu thành công" },
    };
  } catch (error) {
    throw error;
  }
};

// Đổi mật khẩu: Admin
const changePasswordByIdServices = async (id, password) => {
  try {
    const isExistUser = await User.findOne({ where: { id } });
    if (!isExistUser) {
      return {
        success: false,
        code: 500,
        content: { message: "Không tìm thấy thông tin người dùng" },
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    isExistUser.password = hash;
    isExistUser.updatedAt = new Date();
    await isExistUser.save();

    return {
      success: true,
      code: 200,
      content: { message: "Thay đổi mật khẩu thành công" },
    };
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách tất cả người dùng: Admin
const getAllUsersServices = async () => {
  try {
    const users = await User.findAll();
    return { success: true, code: 200, content: users };
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết thông tin người dùng: User
const getDetailUserServices = async (user) => {
  try {
    const isExistUser = await User.findOne({ where: { email: user.email } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy thông tin người dùng",
        },
      };
    } else {
      return {
        success: true,
        code: 200,
        content: {
          id: isExistUser.id,
          email: isExistUser.email,
          fullname: isExistUser.fullname,
          address: isExistUser.address,
          phone_number: isExistUser.phone_number,
          avatar_image: isExistUser.avatar_image,
          createdAt: isExistUser.createdAt,
          updatedAt: isExistUser.updatedAt,
          role_id: isExistUser.role_id,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Thay đổi quyền của một user: admin
const changeRoleUserByIdServices = async (id, role_id) => {
  try {
    const isExistUser = await User.findOne({ where: { id } });
    if (!isExistUser) {
      return {
        success: false,
        code: 404,
        content: {
          message: "Không tìm thấy thông tin người dùng",
        },
      };
    }

    isExistUser.role_id = role_id;
    await isExistUser.save();

    return {
      success: true,
      code: 201,
      content: {
        message: "Hệ thống đã thay đổi quyền của tài khoản này thành công",
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserByIdServices,
  deleteUserServices,
  getDetailUserByIdServices,
  changePasswordServices,
  changePasswordByIdServices,
  updateUserServices,
  getAllUsersServices,
  getDetailUserServices,
  changeRoleUserByIdServices,
};

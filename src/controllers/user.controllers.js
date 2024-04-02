const {
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
} = require("../services/user.services");
const { refreshTokenJwtService } = require("../services/jwt.services");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const registerResult = await registerUser({ email, password, role_id: 3 });
    res.status(registerResult.code).send(registerResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResult = await loginUser({ email, password });
    res.status(loginResult.code).send(loginResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const changePassword = async (req, res) => {
  try {
    const changePasswordResult = await changePasswordServices(
      req.user,
      req.body.password
    );

    res.status(changePasswordResult.code).send(changePasswordResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersServices();
    res.status(users.code).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const changePasswordById = async (req, res) => {
  try {
    const changePasswordByIdResult = await changePasswordByIdServices(
      req.params.id,
      req.body.password
    );

    res.status(changePasswordByIdResult.code).send(changePasswordByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const getDetailUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userResult = await getDetailUserByIdServices(id);
    res.status(userResult.code).send(userResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  try {
    const updateResult = await updateUserByIdServices(id, user);
    res.status(updateResult.code).send(updateResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, content: { message: error.message } });
  }
};

const updateUser = async (req, res) => {
  const user = req.user;
  const data = req.body;
  try {
    const updateUserResult = await updateUserServices(user, data);
    res.status(updateUserResult.code).send(updateUserResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, content: { message: error.message } });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await deleteUserServices(id);
    res.status(deleteUser.code).send(deleteUser);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const getDetailUser = async (req, res) => {
  const user = req.user;
  try {
    const getDetailUserResult = await getDetailUserServices(user);
    res.status(getDetailUserResult.code).send(getDetailUserResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

const changeRoleUserById = async (req, res) => {
  const { id } = req.params;
  const { role_id } = req.body;
  try {
    const changeRoleUserByIdResult = await changeRoleUserByIdServices(
      id,
      role_id
    );
    res.status(changeRoleUserByIdResult.code).send(changeRoleUserByIdResult);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, code: 500, content: { message: error.message } });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return res.status(500).json({
        success: false,
        code: 500,
        content: { message: "The token is required" },
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      success: false,
      code: 404,
      content: { message: "Không tìm thấy token" },
    });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getAllUsers,
  changePasswordById,
  getDetailUserById,
  updateUserById,
  updateUser,
  deleteUser,
  getDetailUser,
  changeRoleUserById,
  refreshToken,
};

const express = require("express");
const {
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
} = require("../controllers/user.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const userRouter = express.Router();

userRouter.get("/", authenticate, authorize([1, 2]), getAllUsers);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/change-password", authenticate, changePassword);
userRouter.patch(
  "/change-password/:id",
  authenticate,
  authorize([1, 2]),
  changePasswordById
);
userRouter.get("/user/:id", authenticate, authorize([1, 2]), getDetailUserById);
userRouter.get("/user", authenticate, getDetailUser);
userRouter.put(
  "/user/info-update/:id",
  authenticate,
  authorize([1, 2]),
  updateUserById
);
userRouter.put("/user/info-update", authenticate, updateUser);
userRouter.delete("/user/:id", authenticate, authorize([1, 2]), deleteUser);
userRouter.put(
  "/user/change-role/:id",
  authenticate,
  authorize([1]),
  changeRoleUserById
);
userRouter.post("/refresh-token", refreshToken);

module.exports = { userRouter };

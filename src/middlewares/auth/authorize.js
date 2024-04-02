const authorize = (arrRole) => {
  return (req, res, next) => {
    const { user } = req;

    if (arrRole.includes(user.role_id)) {
      next();
    } else {
      res.status(500).send({
        success: false,
        code: 500,
        content: { message: "Bạn đã đăng nhập nhưng không đủ quyền" },
      });
    }
  };
};

module.exports = { authorize };

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    // { expiresIn: "30s" }
    { expiresIn: 60 * 60 }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
        if (err || !decoded || !decoded.email) {
          resolve({
            status: "ERR",
            message: "Token không hợp lệ hoặc không chứa thông tin người dùng.",
          });
        } else {
          const access_token = await genneralAccessToken({
            email: decoded.email,
            role_id: decoded.role_id,
          });
          resolve({
            code: 200,
            success: true,
            content: {
              access_token,
            },
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};

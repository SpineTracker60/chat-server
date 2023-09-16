import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

export const sign = (user) => {
  const payload = {
    // access token에 들어갈 payload
    id: user._id,
    role: user.role,
  };

  return jwt.sign(payload, secret, {
    // secret으로 sign하여 발급하고 return
    algorithm: "HS256", // 암호화 알고리즘
    expiresIn: "1y", //expiresIn: '1h' // 유효기간
  });
};

export const verify = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      ok: true,
      id: decoded.id,
      role: decoded.role,
    };
  } catch (err) {
    return {
      ok: false,
      token: token,
      message: err.message,
    };
  }
};

export const refresh = () => {
  // refresh token 발급
  return jwt.sign({}, secret, {
    // refresh token은 payload 없이 발급
    algorithm: "HS256",
    expiresIn: "1y", //expiresIn: '14d'
  });
};

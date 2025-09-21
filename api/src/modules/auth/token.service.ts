import jwt from "jsonwebtoken";
import { TokenPayload } from "../../shared/common/token-payload.interface";

const createAccessToken = async (tokenPayload: TokenPayload) => {
  const accessToken = jwt.sign(
    {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TTL),
    }
  );

  return accessToken;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as TokenPayload;
};

export { createAccessToken, verifyToken };

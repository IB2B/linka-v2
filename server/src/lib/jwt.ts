import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = "7d";

export interface JwtPayload {
  sub: string;
  role: string;
  sv?: number;
}

export function signToken(userId: string, role: string, sessionVersion: number): string {
  return jwt.sign({ sub: userId, role, sv: sessionVersion }, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}

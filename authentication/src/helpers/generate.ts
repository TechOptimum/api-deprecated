import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config();
export function generateToken(data: Record<string, string>): string {
  return sign(data, process.env.TOKEN_SECRET as string);
}

import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed to verify session: ${error.message}`);
    } else {
      console.log("Failed to verify session");
    }
  }
}

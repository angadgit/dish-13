import { cookies } from "next/headers";
import jwt_decode from "jwt-decode";

const Session = () => {
  const nextCookies = cookies();
    const token = nextCookies.get("OursiteJWT")?.value;
    const decoded = jwt_decode(token);
  return decoded;
};

export default Session;

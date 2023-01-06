import jwt from "jsonwebtoken";
import connectDb from "../../dbConnect/conn";
import bcrypt from "bcryptjs";
import Users from "../../models/userSchema";
import { serialize } from "cookie";

const handler = async (req, res) => {
  // console.log(req.body)

  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  if (!user) return res.status(422).json({ message: "Invalid Credentials" });

  const checkPassword = await bcrypt.compare(password, user.password);
  // validate
  if (!checkPassword) {
    return res.status(422).json({ message: "Invalid Credentials" });
  }
  // create a jwt token that is valid for 7 days

  const token = jwt.sign(
    { sub: user._id, userEmail: user.email, createdBy: user.createdBy },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  //   const sendData = user._id;
  const serialised = serialize("OursiteJWT", token, {
    httpOnly: true,
    // maxAge: 60 * 60,
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  return res.status(200).json({ success: "Success", result: serialised });
};

export default connectDb(handler);

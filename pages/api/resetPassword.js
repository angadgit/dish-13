import connectDb from "../../dbConnect/conn";
import Users from "../../models/userSchema";
import { hash } from "bcryptjs";


const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // console.log(req.body)
      const {password, token} = req.body
      const user = await Users.findOne({ token: token });
        // console.log(user)
      if (user) {
        const newPassword = await hash(password, 12)
        await Users.findByIdAndUpdate({_id: user._id}, {$set:{password:newPassword, token:""}},{new:true});
        res
          .status(200)
          .send({
            sucess: true,
            message: "Password has been changed sucessfull!",
          });
      } else {
        return res
          .status(422)
          .json({ message: "don't valid token" });
      }
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default connectDb(handler);

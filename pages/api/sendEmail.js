import connectDb from "../../dbConnect/conn";
import Users from "../../models/userSchema";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import baseUrl from "../../helpers/baseUrl";

// async..await is not allowed in global scope, must use a wrapper
async function sendResetPasswordMail(email, token) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // requireTLS: true,
    service: "gmail",
    auth: {
      user: process.env.SendEmail, // generated ethereal user
      pass: process.env.SendPassword, // generated ethereal password
    },
  });

  let mailOption = {
    from: process.env.SendEmail, // sender address
    to: email, // list of receivers
    subject: "For Reset Password", // Subject line
    html: `<a href="${baseUrl}ForgotPassword/${token}">Click hear this link ${token}</a>`, // html body
  };

transporter.sendMail(mailOption, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail has been Sent :- ", info.response);
  }
});
}

const handler = async (req, res) => {
  
  try {
    if (req.method === "POST") {
      const email = req.body.email;
      const user = await Users.findOne({ email: email });
      // console.log(user)
      if (user) {
        const randomeString = randomstring.generate();
        await Users.updateOne(
          { email: email },
          { $set: { token: randomeString } }
        );
        sendResetPasswordMail(user.email, randomeString);
        res
          .status(200)
          .send({
            sucess: true,
            message: "link send Succsfully in Your Email",
          });
      } else {
        return res
          .status(422)
          .json({ message: "Email don't axist" });
      }
    } else {
      return res
        .status(422)
        .json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default connectDb(handler);

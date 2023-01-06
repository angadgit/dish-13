import connectDb from "../../dbConnect/conn";
import Users from "../../models/userSchema";
import { hash } from "bcryptjs";

const handler = async (req, res) => {
  // console.log(req.body)
  try {
    if (req.method === "POST") {
      // console.log(req.body)
      if (!req.body)
        return res.status(404).json({ message: "Don't have form data...!" });
      const {
        createdBy,
        name,
        email,
        logo,
        department,
        phone,
        addressLine1,
        addressLine2,
        country,
        state,
        city,
        pinCode,
        userRole,
        formPermission,
        deleteAccess,
        updateAccess,
        viewAccess,
        addCreateAccess,
        password,
      } = req.body;

      // check duplicate users
      const checkexisting = await Users.findOne({ email });
      if (checkexisting)
        return res
          .status(422)
          .json({ message: "User Email Already Exists...!" });

      // hash password
      // password: await hash(password, 12)
      Users.create(
        {
          createdBy,
          name,
          email,
          logo,
          department,
          phone,
          addressLine1,
          addressLine2,
          country,
          state,
          city,
          pinCode,
          userRole,
          formPermission,
          deleteAccess,
          updateAccess,
          viewAccess,
          addCreateAccess,
          password: await hash(password, 12),
        },
        function (errors, data) {
          if (errors)
            return res
              .status(404)
              .json({ message: errors });
          res.status(201).json({
            message: "User Created success...!",
            status: true,
            user: data,
          });
        }
      );
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid only POST Accepted" });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export default connectDb(handler);

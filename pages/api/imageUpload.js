import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      console.log(req.body);
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          var oldPath = files.file.filepath;
          // let fileName = fields.user_id + "_"+ fields.file_name + "_" + files.file.originalFilename;
          let dt = files.file.mimetype;
          let fileName = fields.user_email + "." + dt.split("/")[1];
          // var newPath = `./public/uploads/files/${files.file.originalFilename}`;
          var newPath = `./public/image/${fileName}`;
          mv(oldPath, newPath, function (err) {});
          res.status(200).json(newPath);
        });
      });
    } else {
      res.status(400).json({ message: "This method is not allowed" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;

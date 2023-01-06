import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  createdBy: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  logo: { type: String },
  department: { type: String },
  phone: { type: Number },
  addressLine1: { type: String },
  addressLine2: { type: String },
  country: [{}],
  state: [{}],
  city: [{}],
  pinCode: { type: Number },
  userRole: [{}],
  deleteAccess: [],
  updateAccess: [],
  viewAccess: [],
  addCreateAccess: [],
  formPermission: [{}],
  password: { type: String },
  token: {
    type: String,
    default: "",
  },
});

const Users = models.user || model("user", userSchema);

export default Users;

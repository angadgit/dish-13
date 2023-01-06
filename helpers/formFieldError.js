import * as Yup from "yup";

export const UserForm = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  phone: Yup.string().min(10, "Invaild Phone no.").required("Required"),
  department: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  addressLine1: Yup.string().required("Required"),
  pinCode: Yup.string().min(6, "Invaild Pin Code").required("Required"),
  password: Yup.string()
    .min(6, "min 6 digite password required")
    .required("Required"),
});

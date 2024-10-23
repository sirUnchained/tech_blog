const yup = require("yup");
const phoneRegex = /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g;

exports.loginValidation = yup.object({
  body: yup.string().required("email or username is require."),
  password: yup
    .string()
    .min(8, "password is not 8 character")
    .required("password is require."),
});

exports.registerValidation = yup.object({
  firstname: yup
    .string()
    .max(250, "first name must be maximum 250 character.")
    .min(5, "first name must be minimum 5 character."),
  lastname: yup
    .string()
    .max(250, "last name must be maximum 250 character.")
    .min(5, "last name must be minimum 5 character."),
  username: yup
    .string()
    .max(250, "last name must be maximum 250 character.")
    .min(5, "last name must be minimum 5 character.")
    .required("user name is require."),
  phone: yup
    .string()
    .matches(phoneRegex, "phone number is not valid.")
    .max(50, "phone number is too larg.")
    .required("phone number is require."),
  email: yup
    .string()
    .email("email is not valid.")
    .required("email is require."),
  bio: yup.string(
    255,
    "biography is too big ! it must be less than 250 character."
  ),
  password: yup
    .string()
    .min(8, "password is not 8 character")
    .required("password is require."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirm Password is not matched with password."
    )
    .required("Confirm Password is require."),
});

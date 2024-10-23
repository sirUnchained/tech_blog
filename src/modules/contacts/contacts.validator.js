const yup = require("yup");

const phoneRegex = /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g;

const contactValidator = yup.object({
  name: yup.string().max(50, "name is too larg.").required("name is require."),
  email: yup
    .string()
    .email("email is not valid.")
    .required("email is require."),
  phone: yup
    .string()
    .matches(phoneRegex, "phone number is not valid.")
    .max(50, "phone number is too larg.")
    .required("phone number is require."),
  subject: yup
    .string()
    .max(100, "subject is too larg.")
    .required("subject is require."),
  message: yup
    .string()
    .max(250, "message is too larg.")
    .required("message is require."),
});

module.exports = { contactValidator };

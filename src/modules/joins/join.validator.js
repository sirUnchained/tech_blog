const yup = require("yup");

const joinValidator = yup.object({
  email: yup.string().email("email is not valid.").required("email is require."),
});

module.exports = { joinValidator };

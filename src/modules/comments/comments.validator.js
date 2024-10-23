const yup = require("yup");

const validateComment = yup.object({
  content: yup
    .string()
    .max(250, "comment is too larg ! only 250 characters allowed.")
    .required("comment body is require."),
  score: yup
    .string()
    .max(5, "maximum score is 5.")
    .min(1, "minimum score is 1")
    .required("score is require."),
});

module.exports = { validateComment };

function validator(validation) {
  return async (req, res, next) => {
    try {
      await validation.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validator;

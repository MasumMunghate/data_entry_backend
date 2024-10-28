const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.body.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        path: err.path[0],
      }));
      return res.status(400).json({ errors });
    }
    next();
  };
};

module.exports = validate;

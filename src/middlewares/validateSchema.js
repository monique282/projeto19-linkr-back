export function validateSchema(schema) {
  return (req, res, next) => {
    const validate = schema.validate(req.body, { abortEarly: false });

    if (validate.error) {
      let errors = "";
      validate.error.details.forEach((detail, index) => {
        if (index !== validate.error.details.length - 1)
          errors += `${detail.message}\n`;
        else errors += detail.message;
      });
      return res.status(422).send(errors);
    }

    next();
  };
}

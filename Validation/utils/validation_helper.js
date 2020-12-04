export const validation_helper = (req, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    let validation_errors = {};

    for (let i = 0; i < error.details.length; i++) {
      validation_errors[error.details[i].context.key] = error.details[
        i
      ].message.replace(/"/g, "");
    }
    res.status(400).send({ error: validation_errors, data: null });
  } else {
    req.body = value;
    next();
  }
};

export const validation_helper = (req, res, next, schema, type = "body") => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  if (type == "body") {
    const { error, value } = schema.validate(req.body, options);
    sendErrorReport(error, value, req, res, next);
  } else if (type == "params") {
    const { error, value } = schema.validate(req.params, options);
    sendErrorReport(error, value, req, res, next);
  }
};

let sendErrorReport = (error, value, req, res, next) => {
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

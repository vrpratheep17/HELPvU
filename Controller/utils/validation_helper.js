export let validation_helper = (joi_validator_function, user_input) => {
  return new Promise(function (Resolve, Reject) {
    const valid = joi_validator_function.validate(user_input);
    if (valid.error) {
      let err = {
        path: valid.error.details[0].path[0],
        error: valid.error.message.replace(/"/g, ""),
      };
      Reject(err);
    } else {
      Resolve();
    }
  });
};

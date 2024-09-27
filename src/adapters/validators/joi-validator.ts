import {Validator} from "@src/ports/in";
import Joi from "joi";

export const joiValidator = (schema: Joi.ObjectSchema): Validator => (data) => {
  const validate = schema.validate(data, {abortEarly: false});
  if (!validate?.error) {
    return null;
  }
  return validate.error.details.map(error => error.message);
}
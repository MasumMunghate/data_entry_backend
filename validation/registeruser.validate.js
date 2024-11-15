const Joi = require("joi");

const registerUserValidate = {
  body: Joi.object().keys({
    name: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.base": "Name must be a string",
        "string.pattern.base":
          "Name cannot contain special characters or numbers",
        "any.required": "Name is required",
      }),
    email: Joi.string().trim().email().required().messages({
      "string.base": "Email must be a string",
      "any.required": "Email is required",
    }),
    mobile_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.base": "Mobile number must be a string of digits",
        "string.pattern.base": "Mobile number must contain only digits",
        "any.required": "Mobile number is required",
      }),
    address: Joi.string().trim().required().messages({
      "string.base": "Address must be a string",
      "any.required": "Address is required",
    }),
    plan: Joi.number().required().messages({
      "number.base": "Plan must be a number",
      "any.required": "Plan is required",
    }),
    caller: Joi.string()
      .valid(
        "caller 1",
        "caller 2",
        "caller 3",
        "caller 4",
        "caller 5",
        "caller 6",
        "caller 7",
        "caller 8",
        "caller 9"
      )
      .required()
      .messages({
        "any.only": "Caller must be one of the allowed options.",
        "any.required": "Caller is required",
      }),
     
  }),
};

module.exports = registerUserValidate;

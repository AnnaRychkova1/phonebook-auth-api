import { Schema, model } from 'mongoose';
import Joi from 'joi';

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userCreateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be at most 50 characters long',
    'any.required': 'Username is a required field',
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain only letters and numbers and be between 5 and 30 characters long',
      'any.required': 'Password is a required field',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is a required field',
  }),
});

const userLoginSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain only letters and numbers and be between 5 and 30 characters long',
      'any.required': 'Password is a required field',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is a required field',
  }),
});

export const User = model('User', userSchema);

export { userCreateSchema, userLoginSchema };

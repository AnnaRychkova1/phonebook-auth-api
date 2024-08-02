import { Schema, model } from 'mongoose';
import Joi from 'joi';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },

    number: {
      type: String,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Set name for contact'],
    },
  },
  { versionKey: false, timestamps: false }
);

const phonePattern = /^[\d\-\(\)\s]{6,}$/;

const createContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'any.required': 'Name is a required field',
  }),
  number: Joi.string().pattern(phonePattern).required().messages({
    'string.pattern.base':
      'Phone number must be at least 6 characters long and can contain digits, spaces, hyphens, and parentheses',
    'any.required': 'Phone is a required field',
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.min': 'Name must be at least 3 characters long',
  }),
  number: Joi.string().pattern(phonePattern).messages({
    'string.pattern.base':
      'Phone number must be at least 6 characters long and can contain digits, spaces, hyphens, and parentheses',
  }),
});

export const Contact = model('Contact', contactSchema);

export { createContactSchema, updateContactSchema };

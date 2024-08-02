import express from 'express';

import isValidId from '../helpers/isValidId.js';
import validateBody from '../helpers/validateBody.js';
import * as schema from '../schemas/contacts.js';
import authMiddleware from '../middlewares/auth.js';

import {
  getAllContacts,
  deleteContact,
  createContact,
  updateContact,
} from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authMiddleware, getAllContacts);

contactsRouter.post(
  '/',
  authMiddleware,
  validateBody(schema.createContactSchema),
  createContact
);

contactsRouter.delete('/:id', authMiddleware, isValidId, deleteContact);

contactsRouter.patch(
  '/:id',
  authMiddleware,
  isValidId,
  validateBody(schema.updateContactSchema),
  updateContact
);

export default contactsRouter;

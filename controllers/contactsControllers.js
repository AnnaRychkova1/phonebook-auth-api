import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  const owner = req.user.id;
  const { page = 1, limit = 20 } = req.query;

  try {
    const contacts = await contactsService.listContacts(
      owner,
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json(contacts);
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  const owner = req.user.id;
  try {
    const contact = await contactsService.removeContact(id, owner);

    if (contact) {
      res.status(200).json(contact);
    } else {
      next(HttpError(404));
    }
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const owner = req.user.id;
  try {
    const contact = await contactsService.addContact(name, email, phone, owner);
    res.status(201).json(contact);
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const owner = req.user.id;

  if ('owner' in req.body) {
    return next(HttpError(400, 'Changing the owner is not allowed'));
  }

  try {
    const contact = await contactsService.updateContact(id, owner, req.body);

    if (contact) {
      res.status(200).json(contact);
    } else {
      next(HttpError(404));
    }
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

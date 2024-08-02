import { User } from '../schemas/users.js';

async function findUserByElement(element) {
  return User.findOne(element);
}

async function createUser(username, email, password) {
  return User.create({ username, email, password });
}

async function updateUser(_id, body) {
  return User.findByIdAndUpdate({ _id }, body, { new: true });
}

export default {
  findUserByElement,
  createUser,
  updateUser,
};

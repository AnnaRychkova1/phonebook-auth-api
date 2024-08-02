import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import usersService from '../services/usersServices.js';
import HttpError from '../helpers/HttpError.js';

export const signup = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    const isUser = await usersService.findUserByElement({ email });

    if (isUser !== null) {
      return next(HttpError(409, 'Email in use'));
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await usersService.createUser(name, email, passwordHash);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    await usersService.updateUser(newUser._id, { token });

    res.status(201).json({
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await usersService.findUserByElement({ email });

    if (user === null) {
      return next(HttpError(401, 'Email or password is incorrect'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return next(HttpError(401, 'Email or password is incorrect'));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    await usersService.updateUser(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const logout = async (req, res, next) => {
  try {
    await usersService.updateUser(req.user.id, { token: null });

    res.status(204).json({});
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

export const current = async (req, res, next) => {
  const _id = req.user.id;
  try {
    const user = await usersService.findUserByElement({ _id });

    if (!user) {
      return next(HttpError(401, 'Not authorized'));
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    next(HttpError(500, 'Server error'));
  }
};

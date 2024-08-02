import express from 'express';

import validateBody from '../helpers/validateBody.js';
import * as schema from '../schemas/users.js';
import authMiddleware from '../middlewares/auth.js';

import {
  login,
  logout,
  current,
  signup,
} from '../controllers/usersControllers.js';

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(schema.userCreateSchema), signup);

usersRouter.post('/login', validateBody(schema.userLoginSchema), login);

usersRouter.post('/logout', authMiddleware, logout);

usersRouter.get('/current', authMiddleware, current);

export default usersRouter;

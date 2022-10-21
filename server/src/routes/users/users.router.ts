import express from 'express';

import {httpAddUser, httpLoginUser} from './users.controller';

const userRouter = express.Router();

// - /user
userRouter.post('/add', httpAddUser);
userRouter.post('/login', httpLoginUser);

export default userRouter;
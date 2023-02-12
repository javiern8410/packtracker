import express, { Router } from 'express';

import { baseRoute } from './base';
import { getLoginApi } from './login';
import { packsRoutes } from './packs';
import { reportRoutes } from './reports';
import { usersRoutes } from './users';

const getApiController = (): Router => {
	const router = express.Router();

	router.use('/', baseRoute());
	router.use('/packs', packsRoutes());
	router.use('/reports', reportRoutes());
	router.use('/users', usersRoutes());
	router.use('/login', getLoginApi());

	return router;
};

export { getApiController };

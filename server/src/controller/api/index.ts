import express, { Router } from 'express';

import { baseRoute } from './base';
import { packsRoutes } from './packs';

const getApiController = (): Router => {
	const router = express.Router();

	router.use('/', baseRoute());
	router.use('/packs', packsRoutes());

	return router;
};

export { getApiController };

import express, { Router } from 'express';

import { getApiController } from './api';

const getRoutes = (): Router => {
	const router = express.Router();

	router.use('/api', getApiController());

	return router;
};

export { getRoutes };

import express, { Router } from 'express';
import logger from 'loglevel';

import pck from '../../../package.json';

const baseRoute = (): Router => {
	const router = express.Router();

	router.get('/', async (_, res) => {
		try {
			res.json({
				status: 'OK',
				system: 'Pack Tracker API',
				version: pck.version
			});
		} catch (e) {
			logger.error(e);
			res.status(e.response.status).send(e);
		}
	});

	return router;
};

export { baseRoute };

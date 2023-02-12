import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import Pack from '../../../config/mongo/models/pack';
import { STATUS_ENUM } from '../../../constants/app.constants';
import { IPack } from '../../../types/pack';

const reportRoutes = (): Router => {
	const router = express.Router();

	router.get('/', (_: Request, res: Response, next: NextFunction) => {
		const now = new Date();
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const metrics = {
			total: 0,
			totalDelivered: 0,
			deliveredPercent: 0,
			totalToday: 0,
			totalDeliveredToday: 0,
			deliveredPercentToday: 0
		};

		Pack.find({})
			.then((result: IPack[]) => {
				if (result.length > 0) {
					metrics.total = result.length;
					metrics.totalDelivered = result.filter((el) => el.state === STATUS_ENUM.DELIVERED).length;
					metrics.deliveredPercent = Number(
						((metrics.totalDelivered * 100) / metrics.total).toFixed(2)
					);
				}
				Pack.find({ created: { $gte: startOfToday } })
					.then((result: IPack[]) => {
						if (result.length > 0) {
							metrics.totalToday = result.length;
							metrics.totalDeliveredToday = result.filter(
								(el) => el.state === STATUS_ENUM.DELIVERED
							).length;
						}
						Pack.find({ deliveredDate: { $gte: startOfToday }, state: STATUS_ENUM.DELIVERED })
							.then((result: IPack[]) => {
								if (result.length > 0) {
									metrics.totalDeliveredToday = result.length;
									metrics.deliveredPercentToday = Number(
										((metrics.totalDeliveredToday * 100) / metrics.totalToday).toFixed(2)
									);
								}
								res.json(metrics);
							})
							.catch((err) => {
								logger.error(err);
								next(err);
							});
					})
					.catch((err) => {
						logger.error(err);
						next(err);
					});
			})
			.catch((err) => {
				logger.error(err);
				next(err);
			});
	});

	return router;
};

export { reportRoutes };

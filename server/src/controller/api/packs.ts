import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import Pack from '../../../config/mongo/models/pack';
import { STATUS_ENUM } from '../../../constants/app.constants';
import { IPack } from '../../../types/pack';

const packsRoutes = (): Router => {
	const router = express.Router();

	router.get('/', (_: Request, res: Response, next: NextFunction) => {
		Pack.find({})
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		Pack.findById(id)
			.then((result) => {
				if (result) {
					res.json(result);
				} else {
					res.status(404).end();
				}
			})
			.catch((err) => {
				next(err);
			});
	});

	router.post('/', (req: Request, res: Response, next: NextFunction) => {
		const pack = req.body as IPack;
		const newPack = new Pack({
			package: pack.package,
			email: pack.email,
			from: pack.from,
			to: pack.to,
			current: pack.current,
			weight: pack.weight,
			description: pack.description,
			state: pack.state
		});

		console.log(newPack);
		newPack
			.save()
			.then((result) => {
				logger.info(result);
				res.status(201).json(result);
			})
			.catch((err) => {
				logger.error(err);
				next(err);
			});
	});

	router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const pack = req.body as IPack;

		const newPack = {
			package: pack.package,
			description: pack.description,
			email: pack.email,
			state: pack.state,
			from: pack.from,
			to: pack.to,
			weight: pack.weight,
			current: pack.current,
			...(pack.state == STATUS_ENUM.DELIVERED && { deliveredDate: new Date() })
		};

		Pack.findByIdAndUpdate(id, newPack, { new: true })
			.then((result) => {
				logger.info(result);
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		Pack.findByIdAndRemove(id)
			.then((result) => {
				logger.info(result);
				res.status(204).end();
			})
			.catch((err) => {
				next(err);
			});
	});

	return router;
};

export { packsRoutes };

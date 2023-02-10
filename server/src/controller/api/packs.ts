import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import Pack from '../../../config/mongo/models/pack';
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

		const newpackData = {
			state: pack.state,
			delivered: pack.delivered,
			from: pack.from,
			to: pack.to,
			current: pack.current,
			...(!!pack.delivered && { deliveredDate: new Date() })
		};

		Pack.findByIdAndUpdate(id, newpackData, { new: true })
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

import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';
import nodemailer from 'nodemailer';

import Pack from '../../../config/mongo/models/pack';
import { STATUS_ENUM } from '../../../constants/app.constants';
import { IPack } from '../../../types/pack';

dotenv.config();
const { gmailUser, gmailPassword, siteUrl } = process.env;

const mailBaseOptions = {
	from: 'infopacktracker@gmail.com'
};

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: gmailUser,
		pass: gmailPassword
	}
});

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

		newPack
			.save()
			.then((result) => {
				const mailOptions = {
					...mailBaseOptions,
					to: result.email,
					subject: 'PAQUETE RECEPCIONADO',
					html: `Hemos recepccionado su paquete. El número de seguimiento es: ${result.id} <br> <a href='${siteUrl}?id=${result.id}'> Consultar </a>`
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						logger.error(error);
					} else {
						logger.info('Email sent: ' + info.response);
					}
				});
				logger.info(`New Pack added: ${result.id}`);
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
				if (pack.state) {
					const mailOptions = {
						...mailBaseOptions,
						to: result.email,
						subject: 'Estado del paquete actualizado',
						html: `Su paquete con número de seguimiento ${result.id} ha sido actualizado. <br> <a href='${siteUrl}?id=${result.id}'> Consultar </a>`
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							logger.error(error);
						} else {
							logger.info('Email sent: ' + info.response);
						}
					});
				}
				logger.info(`Pack ${id} updated`);

				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		Pack.findByIdAndRemove(id)
			.then(() => {
				logger.info(`Pack ${id} deleted`);
				res.status(204).end();
			})
			.catch((err) => {
				next(err);
			});
	});

	return router;
};

export { packsRoutes };

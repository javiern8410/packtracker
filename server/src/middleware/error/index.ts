import { NextFunction, Request, Response } from 'express';
import logger from 'loglevel';

interface Error {
	name: string;
	message: string;
	stack: string;
}

const errorMiddleware = (error: Error, _: Request, res: Response, next: NextFunction): void => {
	if (res.headersSent) {
		next(error);
	} else {
		logger.error(error);
		let code = 200;
		let message = '';

		if (error.name === 'CastError') {
			logger.error({ message: 'Id used is invalid' });
			code = 400;
			message = 'Id used is invalid';
		}
		message = error.message;

		if (process.env.NODE_ENV === 'production') {
			logger.error(error.stack);
		}

		res.status(code).json({
			message: message
		});
	}
};

export default errorMiddleware;

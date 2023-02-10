import * as dotenv from 'dotenv';
import logger from 'loglevel';
import mongoose from 'mongoose';

import { MONGO_DB, MONGO_URL } from '../../constants/app.constants';

dotenv.config();
const { mongoUser, mongoPass } = process.env;

const user = mongoUser;
const pass = mongoPass;

const urls = MONGO_URL;
const db = MONGO_DB;

const authString = !!user && !!pass && `${user}:${encodeURIComponent(pass)}@`;

const connectionString = `mongodb://${
	authString ? authString : ''
}${urls}/${db}?connectTimeoutMS=20000&socketTimeoutMS=20000&maxPoolSize=10`;

export const connectDB = (): Promise<void> =>
	mongoose
		.connect(connectionString)
		.then(() => {
			logger.info('Database connected');
		})
		.catch((err) => logger.error(err));

export const closeDB = (): Promise<void> => mongoose.connection.close();

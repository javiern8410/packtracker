import { STATUS_ENUM } from '../constants/app.constants';

export interface IPack {
	id?: string;
	created?: Date;
	package: string;
	email: string;
	from: string;
	to: string;
	current?: string;
	weight: number;
	description: string;
	state: STATUS_ENUM;
	deliveredDate?: Date | string | number;
}

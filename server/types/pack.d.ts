export interface IPack {
	created: Date;
	package: string;
	email: string;
	from: string;
	to: string;
	current: string;
	weight: number;
	description: string;
	state: string;
	deliveredDate: Date;
}

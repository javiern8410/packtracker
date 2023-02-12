import React from 'react';

import Box from '../../assets/box.svg';
import { STATUS_ENUM, STATUS_TRANSLATIONS } from '../../constants/app.constants';
import { IPack } from '../../types/pack';
import Steps from '../steps/Steps';
interface PackCardProps {
	data: IPack;
}
function PackCard({ data }: PackCardProps) {
	return (
		<div className="w-full max-w-[26rem] sm:w-[48rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div className="md:flex items-start">
				<div className="md:shrink-0">
					<img
						className="h-48 py-4 w-full md:h-full md:w-48"
						src={Box}
						alt="Modern building architecture"
					/>
				</div>
				<div className="p-8 w-full">
					<div className="flex gap-3">
						<div className="uppercase text-lg text-indigo-500 font-bold">{data.package}</div>
						<div className="badge badge-lg">{STATUS_TRANSLATIONS[data.state]}</div>
					</div>
					<p className="font-bold">
						{data.weight} Kg{data.weight > 1 ? 's' : ''}{' '}
					</p>
					<p className="my-2 text-slate-500">{data.description}</p>
					<p className=" text-sm">Email: {data.email}</p>
					<p className="my-2">
						<span className="font-bold">{STATUS_TRANSLATIONS['RECEIVED']}: </span>
						{data.created && new Intl.DateTimeFormat('es-ES').format(new Date(data.created))}
					</p>
					{data.state === STATUS_ENUM.DELIVERED && (
						<p className="my-2">
							<span className="font-bold">{STATUS_TRANSLATIONS['DELIVERED']}: </span>
							{data.deliveredDate &&
								new Intl.DateTimeFormat('es-ES').format(new Date(data.deliveredDate))}
						</p>
					)}
				</div>
			</div>
			<div className="flex w-full justify-center p-6">
				<Steps data={data} />
			</div>
		</div>
	);
}

export default PackCard;

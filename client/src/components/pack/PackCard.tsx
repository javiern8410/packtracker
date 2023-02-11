import React from 'react';

import Box from '../../assets/box.svg';
import { IPack } from '../../types/pack';
import Steps from '../steps/Steps';
interface PackCardProps {
	data: IPack;
}
function PackCard({ data }: PackCardProps) {
	// return (
	// 	<div className="card lg:card-side bg-base-100 shadow-xl w-full sm:w-96">
	// 		{/* <figure>
	// 			<img src={Box} className="w-24 mx-10 aspect-square" alt={data.package} />
	// 		</figure> */}
	// 		<div className="card-body w-full p-6">
	// 			<h2 className="card-title">{data.package} </h2>
	// 			<p> {data.description} </p>
	// 			<p className="font-bold"> {data.weight} Kgs </p>
	// 			<p>
	// 				{data.delivered && (
	// 					<>
	// 						<span className="font-bold">Entregado: </span>
	// 						{new Intl.DateTimeFormat('en-US').format(date)}
	// 					</>
	// 				)}{' '}
	// 			</p>
	// 			<Steps data={data} />
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="max-w-md sm:w-[48rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
						<div className="uppercase tracking-wide text-lg text-indigo-500 font-bold">
							{data.package}
						</div>
						<div className="text-lg font-medium text-black hover:underline">[ {data.state} ]</div>
					</div>
					<p className="font-bold">
						{data.weight} Kg{data.weight > 1 ? 's' : ''}{' '}
					</p>
					<p className="my-2 text-slate-500">{data.description}</p>
					<p className=" text-sm">Email: {data.email}</p>
					<p className="my-2">
						<span className="font-bold">Recepcionado: </span>
						{new Intl.DateTimeFormat('en-US').format(new Date(data.created))}
					</p>
					{data.delivered && (
						<p className="my-2">
							<span className="font-bold">Entregado: </span>
							{new Intl.DateTimeFormat('en-US').format(new Date(data.deliveredDate))}
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

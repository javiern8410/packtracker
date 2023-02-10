import React from 'react';

import { IPack } from '../../types/pack';
interface PackCardProps {
	data: IPack;
}
function PackCard({ data }: PackCardProps) {
	return (
		<div className="w-full max-w-md border rounded-md p-4">
			<h1 className="text-3xl">Pack Details</h1>
			<div className="grid grid-cols-2">
				<div className=" text-bold-300">Name</div>
				<div>{data.package}</div>
				<div>Description</div>
				<div>{data.description}</div>
				{Object.keys(data).map((item: string) => (
					<React.Fragment key={item}>
						<div>{item}</div>
						{/* <div>{data[item]}</div> */}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default PackCard;

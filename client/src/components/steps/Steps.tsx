import React from 'react';

import { IPack } from '../../types/pack';
interface IStepsProps {
	data: IPack;
}
const Steps = ({ data }: IStepsProps) => {
	const { current } = data;

	return (
		<div>
			<ul className="steps">
				<li className="step">{data.from}</li>
				<li className="step">{data.to}</li>
				<li className="step">{data.to}</li>
				<li className="step">Entregado</li>
			</ul>
			{/* <ul className="steps sm:steps-vertical">
				<li className="step step-primary">Register</li>
				<li className="step step-primary">Choose plan</li>
				<li className="step">Purchase</li>
				<li className="step">Receive Product</li>
			</ul> */}
		</div>
	);
};

export default Steps;

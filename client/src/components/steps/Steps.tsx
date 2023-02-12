import React from 'react';

import { STATUS_ENUM } from '../../constants/app.constants';
import { IPack } from '../../types/pack';
interface IStepsProps {
	data: IPack;
}
const Steps = ({ data }: IStepsProps) => {
	return (
		<ul className="steps w-full">
			<li className={`step ${data.state === STATUS_ENUM.RECEIVED ? 'step-primary' : ''}`}>
				{data.from}
			</li>
			{data.current && (
				<li className={`step ${data.state === STATUS_ENUM.WAY ? 'step-primary' : ''}`}>
					{data.current}
				</li>
			)}
			<li className={`step ${data.state === STATUS_ENUM.DELIVERED ? 'step-primary' : ''}`}>
				{data.to}
			</li>
		</ul>
	);
};

export default Steps;

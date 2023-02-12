import React from 'react';

import { STATUS_ENUM } from '../../constants/app.constants';
import { IPack } from '../../types/pack';
interface IStepsProps {
	data: IPack;
}
const Steps = ({ data }: IStepsProps) => {
	return (
		<ul className="steps w-full">
			<li
				className={`step ${
					data.state === STATUS_ENUM.RECEIVED ||
					(data.state === STATUS_ENUM.WAY && data.from === data.current)
						? 'step-primary'
						: ''
				}`}
			>
				{data.from}
			</li>
			{data.current && data.current != data.from && data.current != data.to && (
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

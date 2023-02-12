import React from 'react';

const Loading = () => {
	return (
		<div className="w-full flex justify-center items-center my-8 p-4">
			<progress className="progress w-11/12 sm:w-3/4"></progress>
		</div>
	);
};

export const SimpleSkeleton = ({ rows = 1 }) => {
	return (
		<div className="w-full flex flex-col gap-3 justify-center items-center my-8 p-4">
			{Array(rows)
				.fill(0)
				.map((_, line) => (
					<progress key={line} className="progress w-11/12 sm:w-3/4"></progress>
				))}
		</div>
	);
};

export default Loading;

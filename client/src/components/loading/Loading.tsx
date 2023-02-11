import React from 'react';

const Loading = () => {
	return (
		<div className="w-full flex justify-center items-center my-8 p-4">
			<progress className="progress w-11/12 sm:w-3/4"></progress>
		</div>
	);
};

export default Loading;

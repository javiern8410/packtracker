import React from 'react';

interface IContainerProps {
	children: React.ReactNode;
}
function Container({ children }: IContainerProps): JSX.Element {
	return <div className="w-full flex justify-center items-center">{children}</div>;
}

export default Container;

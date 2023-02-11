import React from 'react';

import Logo from '../../assets/logo.svg';
import User from '../../assets/user.svg';

interface IHeaderProps {
	setPage: Function;
}

const Header = ({ setPage }: IHeaderProps) => {
	return (
		<div className="flex gap-3 items-center justify-between mb-8">
			<div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
				<img src={Logo} className="inline mr-4 w-16 aspect-square" alt="Pack Tracker" />
				<span className="text-3xl font-bold">Pack Tracker</span>
			</div>
			<div>
				<img
					src={User}
					className="w-16 aspect-square cursor-pointer"
					alt="Dashboard"
					onClick={() => setPage('dashboard')}
				/>
			</div>
		</div>
	);
};

export default Header;

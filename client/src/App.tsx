import React, { useState } from 'react';

import Header from './components/header/Header';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { IUser } from './types/user';

function App() {
	const [page, setPage] = useState('home');
	const [user, setUser] = useState<IUser | null>(null);

	return (
		<div className="flex flex-col p-2 md:p-10 min-w-[320px]">
			<Header setPage={setPage} setUser={setUser} user={user} />

			{page === 'home' ? <Home /> : <Dashboard />}
		</div>
	);
}

export default App;

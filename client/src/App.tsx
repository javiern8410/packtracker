import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
	const [page, setPage] = useState('home');

	return (
		<div className="flex flex-col p-2 md:p-10 min-w-[320px]">
			<Header setPage={setPage} />

			{page === 'home' ? <Home /> : <Dashboard />}
		</div>
	);
}

export default App;

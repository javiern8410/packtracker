import { useState } from 'react';

import Logo from './assets/logo.svg';
import PackCard from './components/pack/PackCard';
import Search from './components/search/Search';
import { IPack } from './types/pack';

function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState<IPack>();

	const getPackage = async (code: string) => {
		console.log('query packs');
		try {
			setLoading(true);
			setError(false);
			const response = await fetch(`http://localhost:4000/api/packs/${code}`);

			if (response.status === 200) {
				const data = await response.json();

				setData(data);
				console.log(data);
			}

			if (response.status === 400) {
				setError(true);
			}
		} catch (error) {
			console.log('error');
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col p-2 md:p-10">
			<div className="flex gap-3 items-center mb-8">
				<img src={Logo} className=" w-16 aspect-square" alt="Pack Tracker" />
				<h1 className="text-3xl font-bold">Pack Tracker</h1>
			</div>
			<Search action={getPackage} />

			<div>{data && <PackCard data={data} />}</div>
			<div className="w-full flex items-center flex-col  bg-white">
				<div>{loading && 'loading...'}</div>

				<div className="bg-white text-red-500">
					{error && 'Error al intentar localizar el paquete'}
				</div>
				<div className="flex flex-col bg-white shadow-md  rounded-md items-center">
					<div className="flex items-center p-4">
						<div
							data-placeholder
							className="mr-2 h-10 w-10  rounded-full overflow-hidden relative bg-gray-200"
						></div>
						<div className="flex flex-col justify-between items-center">
							<div
								data-placeholder
								className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200"
							></div>
						</div>
					</div>
					<div data-placeholder className="h-52 w-full overflow-hidden relative bg-gray-200"></div>

					<div className="flex flex-col p-4">
						<div className="flex">
							<div
								data-placeholder
								className=" flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"
							></div>
							<div
								data-placeholder
								className="flex h-5 w-48 overflow-hidden relative bg-gray-200"
							></div>
						</div>
						<div className="flex mt-1">
							<div
								data-placeholder
								className="flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"
							></div>
							<div
								data-placeholder
								className="flex h-5 w-48 overflow-hidden relative bg-gray-200"
							></div>
						</div>
					</div>
					<div className="w-full h-px  overflow-hidden relative bg-gray-200 m-4"></div>
					<div className="flex justify-between items-center p-4 w-full">
						<div
							data-placeholder
							className="mr-2 h-10 w-16  overflow-hidden relative bg-gray-200"
						></div>

						<div
							data-placeholder
							className="mb-2 h-5 w-20 overflow-hidden relative bg-gray-200"
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

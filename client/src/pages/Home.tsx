import React, { useState } from 'react';

import Container from '../components/container/Container';
import Loading from '../components/loading/Loading';
import PackCard from '../components/pack/PackCard';
import Search from '../components/search/Search';
import { IPack } from '../types/pack';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [data, setData] = useState<IPack>();

	const getPackage = async (code: string) => {
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
				setErrorMsg(
					'Lo sentimos, su intento de rastreo no se realizó correctamente. Compruebe su número de seguimiento.'
				);
			}

			if (response.status === 404) {
				setError(true);
				setErrorMsg('Lo sentimos, no encontramos resultados para su número de seguimiento.');
			}
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Search action={getPackage} />

			{loading && <Loading />}

			{error && (
				<div className="flex flex-col w-full my-4 p-4 bg-white shadow-md  rounded-md items-center">
					<div className="text-lg text-red-500">{errorMsg}</div>
				</div>
			)}
			{data && (
				<Container>
					<PackCard data={data} />
				</Container>
			)}
		</>
	);
};

export default Home;

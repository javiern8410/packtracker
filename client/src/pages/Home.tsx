import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

import Container from '../components/container/Container';
import Loading from '../components/loading/Loading';
import PackCard from '../components/pack/PackCard';
import Search from '../components/search/Search';
import { IPack } from '../types/pack';

const Home = () => {
	const [code, setCode] = useState('');
	const fetcher = useCallback(
		async (): Promise<IPack> =>
			fetch(`http://localhost:4000/api/packs/${code}`).then((res) => res.json()),
		[code]
	);

	const { data, error, isLoading } = useSWR(!code ? null : `api/packs/${code}`, fetcher);

	const getPackage = (code: string) => {
		setCode(code);
	};

	return (
		<>
			<Search action={getPackage} />

			{isLoading && <Loading />}

			{error && (
				<div className="flex flex-col w-full my-4 p-4 bg-white shadow-md  rounded-md items-center">
					<div className="text-lg text-red-500">
						No pudimos encontrar su paquete. Compruebe el número de seguimiento.
					</div>
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

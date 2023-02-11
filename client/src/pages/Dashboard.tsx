import React, { useEffect, useState } from 'react';

import Edit from '../assets/edit.svg';
import AddForm from '../components/forms/AddForm';
import Loading from '../components/loading/Loading';
import { IPack } from '../types/pack';

const Dashboard = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [data, setData] = useState<IPack[]>();

	const getPackages = async () => {
		try {
			setLoading(true);
			setError(false);
			const response = await fetch(`http://localhost:4000/api/packs/`);

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

	useEffect(() => {
		getPackages();
	}, []);

	return (
		<div>
			<label htmlFor="my-modal-3" className="btn mb-5">
				Agregar paquete
			</label>
			{loading && <Loading />}

			{error && (
				<div className="flex flex-col w-full my-4 p-4 bg-white shadow-md  rounded-md items-center">
					<div className="text-lg text-red-500">{errorMsg}</div>
				</div>
			)}
			{data && (
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
							<tr>
								<th></th>
								<th>Paquete</th>
								<th>Estado</th>
								<th>Entregado</th>
							</tr>
						</thead>
						<tbody>
							{data.map((element) => (
								<tr key={element.id}>
									<th>
										<img
											src={Edit}
											className="cursor-pointer max-w-none w-5"
											onClick={() => console.log(element.id)}
										/>
									</th>
									<td> {element.package} </td>
									<td>{element.state}</td>
									<td> {element.delivered ? '✅' : ''} </td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<input type="checkbox" id="my-modal-3" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="text-lg font-bold">Agregar paquete</h3>
					<div className="py-4">
						<AddForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

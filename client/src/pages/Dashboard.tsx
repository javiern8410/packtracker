import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

import Delete from '../assets/delete.svg';
import Edit from '../assets/edit.svg';
import AddForm from '../components/forms/AddForm';
import EditForm from '../components/forms/EditForm';
import Loading, { SimpleSkeleton } from '../components/loading/Loading';
import { BACKEND_URL, STATUS_TRANSLATIONS } from '../constants/app.constants';
import { IPack } from '../types/pack';
import { IReports } from '../types/reports';
import { getStateClass } from '../utils';

const Dashboard = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [pack, setPack] = useState<IPack>();

	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState('');

	const fetcher = useCallback(
		async (): Promise<IPack[]> => fetch(`${BACKEND_URL}packs/`).then((res) => res.json()),
		[]
	);

	const { data, error, isLoading, mutate } = useSWR('api/packs/', fetcher, {
		refreshInterval: 1000
	});

	const metricsFetcher = useCallback(
		async (): Promise<IReports> => fetch(`${BACKEND_URL}reports/`).then((res) => res.json()),
		[]
	);

	const {
		data: reports,
		error: reportsError,
		isLoading: reportsLoading
	} = useSWR('api/reports/', metricsFetcher, {
		refreshInterval: 1000
	});

	const deletePackage = async () => {
		const update = data?.filter((pack) => pack.id != deleteId);

		mutate(update, false);
		fetch(`${BACKEND_URL}packs/${deleteId}`, {
			method: 'DELETE'
		});
		setShowDeleteModal(false);
	};

	const onAdd = () => {
		setShowAddModal(false);
	};

	const onEdit = () => {
		setShowEditModal(false);
	};

	const editPackage = (pack: IPack) => {
		setPack(pack);
		setShowEditModal(true);
	};

	const setDeletePackage = (id = '') => {
		setShowDeleteModal(true);
		setDeleteId(id);
	};

	return (
		<div className="w-full text-center h-full">
			<button
				className="btn btn-circle fixed right-3 bottom-3 z-10 shadow-lg"
				onClick={() => setShowAddModal(true)}
			>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6 12H18"
						stroke="#fff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
					<path
						d="M12 18V6"
						stroke="#fff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>
			</button>
			{reportsLoading && <SimpleSkeleton rows={4} />}
			{reports && (
				<div className="stats stats-vertical sm:stats-horizontal w-full sm:w-11/12 md:w-10/12 lg:w-8/12 shadow mb-4">
					<div className="stat text-center">
						<div className="stat-title">Total</div>
						<div className="stat-value  text-primary">{reports.total}</div>
						<div className="stat-desc">Total de paquetes</div>
					</div>

					<div className="stat text-center">
						<div className="stat-title">Entregados</div>
						<div className="stat-value">{reports.totalDelivered}</div>
						<div className="stat-desc"> {reports.deliveredPercent} %</div>
					</div>

					<div className="stat text-center">
						<div className="stat-title">Nuevos Hoy</div>
						<div className="stat-value">{reports.totalToday}</div>
						<div className="stat-desc">{new Intl.DateTimeFormat('es-ES').format(new Date())}</div>
					</div>

					<div className="stat text-center">
						<div className="stat-title">Entregados hoy</div>
						<div className="stat-value">{reports.totalDeliveredToday}</div>
						<div className="stat-desc"> {reports.deliveredPercentToday} %</div>
					</div>
				</div>
			)}

			<div>
				{isLoading && <Loading />}

				{error && (
					<div className="flex flex-col w-full my-4 p-4 bg-white shadow-md  rounded-md items-center">
						<div className="text-lg text-red-500">Error al cargar listado de paquetes</div>
					</div>
				)}
				{data && (
					<div className="overflow-x-auto">
						<table className="table table-zebra w-full">
							<thead>
								<tr>
									<th></th>
									<th className="w-[120px]">Código</th>
									<th>Paquete</th>
									<th>Estado</th>
									<th>Origen</th>
									<th>Destino</th>
								</tr>
							</thead>
							<tbody>
								{data.map((element) => (
									<tr key={element.id}>
										<th className="w-[80px]">
											<div className="flex items-center w-full justify-center gap-2">
												<img
													src={Edit}
													className="cursor-pointer max-w-none w-5"
													onClick={() => editPackage(element)}
												/>
												<img
													src={Delete}
													className="cursor-pointer max-w-none w-5"
													onClick={() => setDeletePackage(element.id)}
												/>
											</div>
										</th>
										<td> {element.id} </td>
										<td> {element.package} </td>
										<td>
											<div className={`badge ${getStateClass(element.state)}`}>
												{STATUS_TRANSLATIONS[element.state]}
											</div>
										</td>
										<td>{element.from}</td>
										<td>{element.to}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<div className={`modal ${showAddModal ? 'modal-open' : ''}`}>
					<div className="modal-box relative">
						<label
							htmlFor="add-modal"
							id="closeAddModal"
							onClick={() => setShowAddModal(false)}
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<h3 className="text-lg font-bold">Agregar paquete</h3>
						<div className="py-4">{showAddModal && <AddForm onFinish={onAdd} />}</div>
					</div>
				</div>

				<div className={`modal ${showEditModal ? 'modal-open' : ''}`}>
					<div className="modal-box relative">
						<label
							htmlFor="edit-modal"
							id="closeEditModal"
							onClick={() => setShowEditModal(false)}
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<h3 className="text-lg font-bold">Editar paquete</h3>
						<div className="py-4">
							{showEditModal && <EditForm data={pack as IPack} onFinish={onEdit} />}
						</div>
					</div>
				</div>

				<div
					className={`modal modal-bottom sm:modal-middle ${showDeleteModal ? 'modal-open' : ''}`}
				>
					<div className="modal-box">
						<h3 className="font-bold text-lg">Eliminar Paquete</h3>
						<p className="py-4">Confirma que desea eliminar este paquete?</p>
						<div className="modal-action">
							<button className="btn" onClick={() => deletePackage()}>
								Confirmar
							</button>
							<button className="btn" onClick={() => setShowDeleteModal(false)}>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

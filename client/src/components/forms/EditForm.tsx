import React, { useState } from 'react';

import { STATUS_ENUM, STATUS_TRANSLATIONS } from '../../constants/app.constants';
import { IPack } from '../../types/pack';
interface IAddFormProps {
	onFinish: Function;
	data: IPack;
}

const EditForm = ({ onFinish, data }: IAddFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const editPackage = async (e: any) => {
		e.preventDefault();
		const entries: IPack | any = {};

		new FormData(e.target).forEach((value, key) => {
			try {
				entries[key] = JSON.parse(value as any);
			} catch (err) {
				entries[key] = value;
			}
		});

		try {
			setLoading(true);
			setError(false);

			if (data.state === entries['state']) {
				delete entries.state;
			}

			const response = await fetch(`http://localhost:4000/api/packs/${data.id}`, {
				method: 'PUT',
				body: JSON.stringify(entries),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.status != 200) {
				setError(true);
			} else {
				onFinish();
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form id="addForm" method="POST" onSubmit={editPackage}>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Nombre del paquete</span>
					</label>
					<input
						type="text"
						name="package"
						placeholder="Nombre"
						required
						className="input input-sm input-bordered w-full"
						defaultValue={data.package}
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Descripción</span>
					</label>
					<textarea
						name="description"
						placeholder="Descripción"
						className="textarea textarea-bordered textarea-md w-full"
						defaultValue={data.description}
					></textarea>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Email del usuario</span>
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="input input-sm input-bordered w-full"
						defaultValue={data.email}
					/>
				</div>
				<div className="flex gap-3">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Lugar de origen</span>
						</label>
						<input
							type="text"
							placeholder="Origen"
							name="from"
							className="input input-sm input-bordered w-full"
							defaultValue={data.from}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Lugar de destino</span>
						</label>
						<input
							type="text"
							placeholder="Destino"
							name="to"
							required
							className="input input-sm input-bordered w-full"
							defaultValue={data.to}
						/>
					</div>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Ubicación actual</span>
					</label>
					<input
						type="text"
						placeholder="Ubicación actual"
						name="current"
						className="input input-sm input-bordered w-full"
						defaultValue={data.current}
					/>
				</div>

				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Peso en Kgs</span>
					</label>
					<input
						type="number"
						required
						name="weight"
						placeholder="Peso"
						className="input input-sm input-bordered w-full"
						defaultValue={data.weight}
					/>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Estado</span>
					</label>
					<select
						name="state"
						className="select select-bordered select-sm w-full"
						defaultValue={data.state}
					>
						{Object.values(STATUS_ENUM).map((option) => (
							<option key={option} value={option}>
								{STATUS_TRANSLATIONS[option]}
							</option>
						))}
					</select>
				</div>

				<button disabled={loading} className={`btn my-3 w-full ${loading ? 'loading' : ''}`}>
					Guardar
				</button>
				{error && (
					<div className="alert alert-error shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								onClick={() => setError(false)}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Error al editar el paquete!.</span>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default EditForm;

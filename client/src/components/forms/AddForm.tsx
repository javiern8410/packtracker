import React, { useState } from 'react';

import { BACKEND_URL } from '../../constants/app.constants';
interface IAddFormProps {
	onFinish: Function;
}

const AddForm = ({ onFinish }: IAddFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const addPackage = async (e: any) => {
		e.preventDefault();
		const entries: any = {};

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

			const response = await fetch(`${BACKEND_URL}packs/`, {
				method: 'POST',
				body: JSON.stringify(entries),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.status != 201) {
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
			<form id="addForm" method="POST" onSubmit={addPackage}>
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
						required
					></textarea>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Email del usuario</span>
					</label>
					<input
						type="email"
						name="email"
						required
						placeholder="Email"
						className="input input-sm input-bordered w-full"
					/>
				</div>
				<div className="flex gap-3">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Lugar de entrega</span>
						</label>
						<input
							type="text"
							placeholder="Entrega"
							name="from"
							required
							className="input input-sm input-bordered w-full"
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
						/>
					</div>
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
					/>
				</div>

				<button disabled={loading} className={`btn my-3 w-full ${loading ? 'loading' : ''}`}>
					Agregar
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
							<span>Error al agregar el paquete!.</span>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default AddForm;

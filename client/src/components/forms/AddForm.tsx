import React, { useState } from 'react';

function AddForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const addPackage = async (e: any) => {
		e.preventDefault();
		const entries: any = {};

		new FormData(e.target).forEach((value, key) => {
			try {
				entries[key] = JSON.parse(value);
			} catch (err) {
				entries[key] = value;
			}
		});

		try {
			setLoading(true);
			setError(false);

			const response = await fetch('http://localhost:4000/api/packs/', {
				method: 'POST',
				body: JSON.stringify(entries),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const result = await response.json();

			console.log(result);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form id="addForm" method="POST" onSubmit={addPackage}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Nombre del paquete</span>
					</label>
					<input
						type="text"
						name="package"
						placeholder="Nombre"
						required
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Descripción</span>
					</label>
					<textarea
						name="description"
						placeholder="Descripción"
						className="textarea textarea-bordered textarea-md w-full max-w-xs"
					></textarea>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Email del usuario</span>
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Lugar de entrega</span>
					</label>
					<input
						type="text"
						placeholder="Entrega"
						name="from"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Lugar de destino</span>
					</label>
					<input
						type="text"
						placeholder="Destino"
						name="to"
						required
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Peso en Kgs</span>
					</label>
					<input
						type="text"
						required
						name="weight"
						placeholder="Peso"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<button disabled={loading} className={`btn my-3 w-full ${loading ? 'loading' : ''}`}>
					Agregar
				</button>
			</form>
		</div>
	);
}

export default AddForm;

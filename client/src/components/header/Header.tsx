import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

import Logo from '../../assets/logo.svg';
import User from '../../assets/user.svg';
import { IUser } from '../../types/user';

interface IHeaderProps {
	setPage: Function;
	setUser: Function;
	user: IUser | null;
}

const Header = ({ setPage, setUser, user }: IHeaderProps) => {
	const [userModal, setUserModal] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handlePage = () => {
		if (user) {
			setPage('dashboard');
		} else {
			setUserModal(true);
		}
	};

	const login = async () => {
		try {
			setError(false);
			setLoading(true);
			const response = await fetch(`http://localhost:4000/api/login`, {
				method: 'POST',
				body: JSON.stringify({
					username,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.status === 200) {
				const data = await response.json();

				setUser(data);
				setUserModal(false);
				setPage('dashboard');
			} else {
				setError(true);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex gap-3 items-center justify-between mb-8">
			<div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
				<img src={Logo} className={`inline mr-4 w-16 aspect-square`} alt="Pack Tracker" />
				<span className="text-2xl sm:text-3xl font-bold">Pack Tracker</span>
			</div>
			<div>
				<img
					src={User}
					className={`w-16 rounded-xl aspect-square cursor-pointer ${user ? 'bg-blue-500' : ''}`}
					alt="Dashboard"
					onClick={() => handlePage()}
				/>
			</div>
			<div className={`modal modal-bottom sm:modal-middle ${userModal ? 'modal-open' : ''}`}>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-2">Login</h3>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Usuario</span>
						</label>
						<input
							type="text"
							required
							name="username"
							placeholder="Usuario"
							onChange={(e) => setUsername(e.target.value)}
							className="input input-sm input-bordered w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Contraseña</span>
						</label>
						<input
							type="password"
							required
							name="password"
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
							className="input input-sm input-bordered w-full"
						/>
					</div>
					<div className="modal-action">
						<button
							className={`btn ${loading ? 'loading' : ''}`}
							disabled={loading}
							onClick={() => login()}
						>
							Confirmar
						</button>
						<button className="btn" disabled={loading} onClick={() => setUserModal(false)}>
							Cancelar
						</button>
					</div>
					{error && (
						<div className="alert alert-error shadow-lg mt-4">
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
								<span>Usuario o Contraseña inválida!.</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;

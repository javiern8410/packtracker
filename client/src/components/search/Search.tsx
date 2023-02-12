import React, { useState } from 'react';

interface ISearchProps {
	action: Function;
	id?: string;
}
const Search = ({ action, id = '' }: ISearchProps) => {
	const [code, setCode] = useState(id);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setCode(value);
	};

	return (
		<>
			<div className="w-full">
				<div className="bg-white w-full flex justify-center items-center min-h-12 shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="input-group w-full sm:w-1/2 ">
						<input
							value={code}
							onChange={handleChange}
							type="text"
							placeholder="Ingrese el número de rastreo"
							className="input input-bordered w-full focus:border-spacing-0 focus:outline-none"
						/>
						<button className="btn btn-square" disabled={!code} onClick={() => action(code)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Search;

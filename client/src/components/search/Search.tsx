import React, { useState } from 'react';

interface ISearchProps {
	action: Function;
}
const Search = ({ action }: ISearchProps) => {
	const [code, setCode] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setCode(value);
	};

	return (
		<>
			<div className="w-full">
				<div className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4 grid sm:flex gap-3 justify-center">
						<input
							className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="id"
							type="text"
							placeholder="Insert pack code"
							onChange={handleChange}
						/>
						<button
							className="bg-blue-500 disabled:bg-slate-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
							disabled={!code}
							onClick={() => action(code)}
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Search;

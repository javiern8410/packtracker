import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Search from './Search';
const fn = vi.fn();

describe('Search component', () => {
	afterEach(cleanup);

	it('Search without id', () => {
		render(<Search action={fn} id={''} />);
		const searchBtn = screen.getByRole('button');

		expect(searchBtn).toBeDefined();
		searchBtn.click();
		expect(fn).toHaveBeenCalledTimes(0);
	});

	it('Search with id', () => {
		render(<Search action={fn} id={'111111'} />);
		const searchBtn = screen.getByRole('button');

		expect(searchBtn).toBeDefined();
		searchBtn.click();
		expect(fn).toHaveBeenCalledTimes(1);
	});
});

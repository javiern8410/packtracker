import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Home from './Home';

describe('Test Home Page', () => {
	afterEach(cleanup);

	it('Home Page', () => {
		render(<Home id={'1111'} />);
		const input = screen.getByTestId('search');

		expect(input).toBeDefined();
	});
});

import { STATUS_ENUM } from '../constants/app.constants';

export const getStateClass = (state: STATUS_ENUM) => {
	switch (state) {
		case STATUS_ENUM.DELIVERED:
			return 'badge-primary';
		case STATUS_ENUM.WAY:
			return 'badge-accent';
		case STATUS_ENUM.RECEIVED:
			return 'badge-secondary';
		default:
			return '';
	}
};

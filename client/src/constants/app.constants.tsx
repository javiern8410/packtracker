export enum STATUS_ENUM {
	'RECEIVED' = 'RECEIVED',
	'WAY' = 'WAY',
	'DELIVERED' = 'DELIVERED'
}

export const STATUS_TRANSLATIONS = {
	[STATUS_ENUM.RECEIVED]: 'Recibido',
	[STATUS_ENUM.WAY]: 'En camino',
	[STATUS_ENUM.DELIVERED]: 'Entregado'
};

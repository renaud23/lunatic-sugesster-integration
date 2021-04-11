export const storeCog = {
	name: 'cog',
	fields: [
		{ name: 'libelle', rules: 'soft' },
		{ name: 'nccenr', rules: 'soft' },
		{ name: 'com', rules: 'soft' },
	],
	queryParser: { type: 'soft' },
	version: '1',
	display: 'libelle',
};

export const storeNaf = {
	name: 'naf-rev2',
	fields: [
		{ name: 'libelle', rules: [/[\w]+/], language: 'French', min: 3 },
		{ name: 'code' },
	],
	queryParser: {
		type: 'tokenized',
		params: { language: 'French', pattern: /[\w.]+/ },
	},
	version: '1',
	display: 'libelle',
};

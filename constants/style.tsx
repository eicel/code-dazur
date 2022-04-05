export const THEMES = {
	light: {
		background: '#f2f2f2',
		navBarUser: '#232f3e',
		textColor: '#000',
		navBarColor: '#fff',
		linkColor: '#146eb4',
		orange: '#ff9900',
	},
	dark: {
		background: '#232f3e',
		navBarUser: '#f9f9f9',
		textColor: '#fff',
		navBarColor: '#000',
		linkColor: '#146eb4',
		orange: '#ff9900',
	}
}

export const LAYOUT_TEMPLATE = {
	border: `
		border: 1px solid transparent;
		border-radius: 3px;
	`,
	boxShadow: `
		box-shadow: 0 2px 4px 0 rgb(0, 0, 0);
	`,
}

export const transitionStringTemplate = (fields: Array<string>) => {
	for (let i = 0; i < fields.length; i++) {
		fields[i] = `${fields[i]} 0.15s ease-out`;
	}
	return fields.join(', ') + ';';
}
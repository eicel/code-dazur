import { createContext, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ContextType, FilterOptions, ItemType } from '../constants/types';
import { DATA } from '../constants/data';

export const AppContext = createContext<ContextType>({
	theme: 'light',
	category: 'all',
	changeTheme: () => {},
	changeCategory: () => {},
	data: DATA,
	setData: () => {}
});

function App({ Component, pageProps }: AppProps) {
	const changeTheme = () => {
		setState(prevState => {
			const currentTheme = prevState.theme === 'light' ? 'dark' : 'light';
			window.localStorage.setItem('theme', currentTheme);
			return {
				...prevState,
				theme: currentTheme
			}
		});
	};

	const changeCategory = (category: FilterOptions) => {
		setState({
			...state,
			category,
		});
	};
	
	const changeData = (data: Array<ItemType>) => {
		setState({
			...state,
			data,
		});
	}

	useEffect(() => {
		const theme = window.localStorage.getItem('theme');
		if (theme && (theme === 'light' || theme === 'dark')) {
			setState({
				...state,
				theme,
			})
		}
	}, []);

	const [state, setState] = useState<ContextType>({
		theme: 'light',
		changeTheme,
		changeCategory,
		category: 'all',
		data: DATA,
		setData: changeData
	});

	return (
		<AppContext.Provider value={state}>
			<Component {...pageProps} />
		</AppContext.Provider>
	)
}
	
export default App
	
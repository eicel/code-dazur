export interface ContextType {
	theme: 'light' | 'dark',
	changeTheme: () => void,
	category: 'general' | 'rare' | 'all',
	changeCategory: (category: FilterOptions) => void,
	data: Array<ItemType>,
	setData: (newData: Array<ItemType>) => void,
}

export type FilterOptions = 'all' | 'rare' | 'general';

export interface ItemType {
	name: string,
	sellIn: number,
	quality: number,
	id: string,
	category: string,
	imageText: string,
}
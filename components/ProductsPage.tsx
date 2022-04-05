import styled from "styled-components";
import FilterComponent from "./Filter";
import HeaderContainer from "./HeaderComponent";
import Item from "./Item";
import { ContextType } from '../constants/types';
import { AppContext } from '../pages/_app';
import { THEMES } from "../constants/style";
import { useContext, useEffect, useState } from "react";

const OuterContainer = styled.div<{bgColor: string}>`
	min-height: 100vh;
	padding-bottom: 10px;
	${props => props.bgColor && `
		background-color: ${props.bgColor};
	`}
`;

const ResponsiveContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	max-width: 1500px;
	margin: 20px auto 0 auto;
	@media (max-width: 1442px) {
		padding: 0 20px;
	}
	@media (max-width: 1024px) {
		flex-direction: column;
	}
	@media (max-width: 800px) {
		margin: 0;
	}
`;

const ItemListContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(3, 1fr);
	justify-content: center;
	row-gap: 20px;
	column-gap: 20px;
	margin-top: 20px;
	margin-left: 20px;
	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		margin-left: 0;
	}
	@media (max-width: 800px) {
		grid-template-columns: repeat(1, 1fr);
		margin-left: 0;
	}
`;

const ProductsPage = () => {
	const contextObj: ContextType = useContext(AppContext);
	const chosenTheme = THEMES[contextObj.theme];

	const [filteredData, setFilteredData] = useState(contextObj.data);

	useEffect(() => {
		const filteredData = contextObj.data.filter((eachData) => {
			if (contextObj.category === 'all') {
				return eachData;
			}
			return eachData.category === contextObj.category;
		});
		setFilteredData(filteredData);
	}, [contextObj.category, contextObj.data]);

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const category = urlParams.get('category');

		if (category
			&& (category === 'all' || category === 'rare' || category === 'general')) {
				contextObj.changeCategory(category);
		}
	}, []);

	return (
		<OuterContainer bgColor={chosenTheme.background}>
			<HeaderContainer goMain />
			<ResponsiveContainer>
				<FilterComponent />
				<ItemListContainer>
					{filteredData.map((eachData) => (
						<Item data={eachData}
							key={eachData.id}
							hideLink
						/>
					))}
				</ItemListContainer>
			</ResponsiveContainer>
		</OuterContainer>
	);
};

export default ProductsPage;
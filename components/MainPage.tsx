import { useContext } from "react";
import styled from "styled-components";
import { THEMES } from "../constants/style";
import { ContextType } from "../constants/types";
import { AppContext } from "../pages/_app";
import HeaderContainer from "./HeaderComponent";
import Item from "./Item";
import Slider from "./Slider";

const OuterContainer = styled.div<{bgColor: string}>`
	min-height: 100vh;
	padding-bottom: 10px;
	${props => props.bgColor && `
		background-color: ${props.bgColor};
	`}
`;

const Title = styled.h2<{marginTop?: string}>`
	margin: 0;
	margin-bottom: 20px;
	${props => props.marginTop && `
		margin-top: ${props.marginTop};
	`}
`

const ResponsiveContainer = styled.div`
	max-width: 1200px;
	margin: 20px auto 0 auto;
`;

const ItemListContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	row-gap: 20px;
	column-gap: 20px;
	margin-top: 20px;
	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 800px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const MainPage = () => {
	const contextObj: ContextType = useContext(AppContext);
	const chosenTheme = THEMES[contextObj.theme];

	return (
		<OuterContainer bgColor={chosenTheme.background}>
			<HeaderContainer />
			<ResponsiveContainer>
				<Title>
					Special Offers!
				</Title>
				<Slider />
				<Title marginTop='50px'>
					Based on your likes
				</Title>
				<ItemListContainer>
					{contextObj.data.map((eachData) => (
						<Item data={eachData}
							key={eachData.id}
						/>
					))}
				</ItemListContainer>
			</ResponsiveContainer>
		</OuterContainer>
	);
};

export default MainPage;
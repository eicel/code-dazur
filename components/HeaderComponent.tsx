import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { THEMES } from "../constants/style";
import { ContextType } from "../constants/types";
import { AppContext } from "../pages/_app";
import { Button } from "./CommonStyles";
import TimeTravel from "./TimeTravel";

const NavBarButton = styled(Button)`
	justify-self: center;
	padding: 0;
	& a {
		padding: 10px 20px;
		display: inline-block;
		width: 100%;
		height: 100%;
	}
`

const Header = styled.header<{bgColor: string, color: string}>`
	position: relative;
	display: grid;
	z-index: 10;
	grid-template-columns: repeat(3, 33.3334%);
	align-items: center;
	padding: 10px;
	line-height: 50px;
	${props => props.bgColor && `
		background-color: ${props.bgColor};
	`}}
	${props => props.color && `
		color: ${props.color};
	`}}
`;

const ImagerContainer = styled.div`
	width: 32px;
	height: 32px;
	border: 1px solid transparent;
	border-radius: 50%;
	background-color: #fff;
`;

const RightAlignedContainer = styled.div`
	justify-self: end;
`;

interface HeaderPropType {
	goMain?: boolean,
}

const HeaderContainer: React.FC<HeaderPropType> = (props) => {
	const {
		goMain,
	} = props;

	const contextObj: ContextType = useContext(AppContext);
	const chosenTheme = THEMES[contextObj.theme];

	return (
		<Header bgColor={chosenTheme.navBarUser} color={chosenTheme.navBarColor}>
			<ImagerContainer>
				<Image src='/images/code-dazur.png'
					alt="code-d'azur logo"
					width={36}
					height={36}
				/>
			</ImagerContainer>
			<NavBarButton bgColor={chosenTheme.navBarColor} color={chosenTheme.navBarUser} width='150px'>
				<a href={goMain ? '/' : '/products'}>
					{goMain ? 'go back' : 'go to products'}
				</a>
			</NavBarButton>
			<RightAlignedContainer>
				<TimeTravel />
			</RightAlignedContainer>
		</Header>
	)
}

export default HeaderContainer;
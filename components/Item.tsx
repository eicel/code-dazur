import React, { useContext } from 'react';
import styled from 'styled-components';
import { LAYOUT_TEMPLATE, THEMES, transitionStringTemplate } from '../constants/style';
import { ContextType, ItemType } from '../constants/types';
import { AppContext } from '../pages/_app';
import { Button, TextImage } from './CommonStyles';

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	${LAYOUT_TEMPLATE.boxShadow}
	@media (max-width: 800px) {
		max-width: none;
	}
`;

const ItemValueContainer = styled.div<{color: string}>`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	font-size: 0.9em;
	padding: 10px 20px;
	${props => props.color && `
		color: ${props.color};
	`}
	& strong {
		margin: 0;
		margin-right: 5px;
	}
`;

const ItemInteractionContainer = styled.div<{linkColor: string, linkHoverColor: string}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 5px;
	font-size: 1em;
	padding: 10px 20px;
	& a {
		transition: ${transitionStringTemplate(['color'])};
		${props => props.linkColor && `
			color: ${props.linkColor};
		`}
	}
	& a:hover {
		${props => props.linkHoverColor && `
			color: ${props.linkHoverColor};
		`}
	}
`;

interface ItemPropType {
	data: ItemType,
	hideLink?: boolean,
}

const Item: React.FC<ItemPropType> = (props) => {
	const contextObj: ContextType = useContext(AppContext);
	const {
		data,
		hideLink
	} = props;
	const chosenTheme = THEMES[contextObj.theme];

	return (
		<section>
			<ItemContainer>
				<TextImage>
					<div>
						{data.imageText}
					</div>
				</TextImage>
				<ItemValueContainer color={chosenTheme.textColor}>
					<div>
						<strong>
							Sell In:
						</strong>
						<span>
							{data.sellIn}
						</span>
					</div>
					<div>
						<strong>
							Quality:
						</strong>
						<span>
							{data.quality}
						</span>
					</div>
				</ItemValueContainer>
				<ItemInteractionContainer linkColor={chosenTheme.linkColor} linkHoverColor={chosenTheme.orange}>
					{!hideLink && (
						<a href={`/products?category=${data.category}`}>
							Show me like this
						</a>
					)}
					<Button bgColor={chosenTheme.orange}>
						add to cart
					</Button>
				</ItemInteractionContainer>
			</ItemContainer>
		</section>
	);
}

export default Item;
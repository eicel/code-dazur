import styled from "styled-components";
import { LAYOUT_TEMPLATE, transitionStringTemplate } from "../constants/style";

export const Button = styled.button<{bgColor: string, color?: string, width?: string}>`
	padding: 10px 20px;
	text-transform: uppercase;
	outline: none;
	cursor: pointer;
	${LAYOUT_TEMPLATE.border}
	transition: ${transitionStringTemplate(['background-color'])}
	${props => props.bgColor && `
		background-color: ${props.bgColor};

	`}
	${props => props.color && `
		color: ${props.color};

	`}
	${props => props.width && `
		width: ${props.width};

	`}
	&:hover {
		background-color: #AAA;
	}
`;

export const TextImage = styled.div`
	height: 300px;
	font-size: 1em;
	text-align: center;
	color: #FFF;
	background-image: linear-gradient(to bottom, transparent 50%, #28487d 50%),
                    linear-gradient(to right, #617ca2 50%, #28487d 50%);
  	background-size: 10px 10px, 10px 10px;
	& div {
		font-weight: bold;
		user-select: none;
		line-height: 300px;
	}
`;

export const Chevron = styled.div<{direction?: string}>`
	&:before {
		border-style: solid;
		border-width: 0.25em 0.25em 0 0;
		content: '';
		color: #d9d9d9;
		display: inline-block;
		height: 1.45em;
		left: 0.15em;
		position: relative;
		top: 0.15em;
		transform: rotate(-45deg);
		vertical-align: top;
		width: 1.45em;
	}
	${props => props.direction === 'right' && `
		&:before {
			transform-origin: center;
			transform: scale(2) translateX(-50%) rotate(45deg);
		}
	`}
	${props => props.direction === 'left' && `
		&:before {
			transform-origin: center;
			transform: scale(2) translateX(50%) rotate(-135deg);
		}
	`}
`;
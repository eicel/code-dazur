import { useContext, useEffect, useState } from "react";
import { motion, Variants } from 'framer-motion';
import styled from "styled-components";
import { LAYOUT_TEMPLATE, THEMES } from "../constants/style";
import { ContextType } from "../constants/types";
import { AppContext } from "../pages/_app";

const DropdownOuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	${LAYOUT_TEMPLATE.border};
	min-width: 150px;
`;

const Title = styled.div<{bgColor: string}>`
	font-size: 0.8em;
	padding: 0 20px 10px 0;
	font-weight: bold;
	${props => props.bgColor && `
		background-color: ${props.bgColor};
	`}
`;

const DropdownItem = styled.div`
	${LAYOUT_TEMPLATE.border}
	${LAYOUT_TEMPLATE.boxShadow}
	font-size: 0.7em;
	padding: 10px 20px;
`;

export type DropdownDataType = {
	key: string,
	value: string
}

interface DropdownPropType {
	data: Array<DropdownDataType>,
	value: string,
	title: string
	onChange: (data: DropdownDataType) => void,
}

const Dropdown: React.FC<DropdownPropType> = (props) => {
	const {
		data,
		value,
		title,
		onChange
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [selectedObj, setSelectedObj] = useState<null | DropdownDataType>(null);
	const contextObj: ContextType = useContext(AppContext);
	const chosenTheme = THEMES[contextObj.theme];

	const variantObj: Variants = {
		open: {
			transform: 'scaleY(1)',
		},
		close: {
			transform: 'scaleY(0)',
			transitionEnd: {
				display: 'none'
			}
		},
	}

	useEffect(() => {
		const obj = data.find((eachData) => eachData.key === value);
		if (obj) {
			setSelectedObj(obj);
		} else {
			setSelectedObj(data[0]);
		}
	}, [value]);

	const toggle = () => {
		setIsOpen(prevIsOpen => !prevIsOpen);
	}

	const onClick = (obj: DropdownDataType) => {
		setSelectedObj(obj);
		toggle();
		
		onChange(obj);
	}

	return (
		<DropdownOuterContainer>
			<Title bgColor={chosenTheme.background}>
				{title}
			</Title>
			<DropdownItem onClick={toggle}>
				{selectedObj ? selectedObj.value : ''}
			</DropdownItem>
			<motion.div initial={false}
				animate={isOpen ? 'open' : 'close'}
				transition={{ ease: "easeOut", duration: 0.15 }}	
				variants={variantObj}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					transformOrigin: 'top center'
				}
			}>
				{data.map((eachData) => (
					<DropdownItem key={eachData.key} onClick={() => onClick(eachData)}>
						{eachData.value}
					</DropdownItem>
				))}
			</motion.div>
		</DropdownOuterContainer>
	);
}

export default Dropdown;
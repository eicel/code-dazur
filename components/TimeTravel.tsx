import React, { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import { motion, Variants } from 'framer-motion';
import styled from "styled-components";
import { ContextType } from "../constants/types";
import { AppContext } from "../pages/_app";
import { LAYOUT_TEMPLATE } from "../constants/style";
import { Button } from "./CommonStyles";
import { DATA, updateQuality } from "../constants/data";

const OuterContainer = styled.div`
	position: relative;
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledButton = styled(Button)`
	margin-right: 10px;
`;

const TimeTravelControls = styled.div`
	padding: 20px;
	background-color: #f6f6f6;
	${LAYOUT_TEMPLATE.boxShadow}
	& input {
		background-color: #f6f6f6;
		outline: none;
		border: 0;
		border-bottom: 1px solid #666;
	}
`;

const TimeTravel = () => {
	const variantObj: Variants = {
		open: {
			transform: 'scale(1)',
		},
		close: {
			transform: 'scale(0)',
		},
	}

	const [inputValue, setInputValue] = useState('0');
	const [isOpen, setIsOpen] = useState(false);

	const contextObj: ContextType = useContext(AppContext);;

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === '') {
			setInputValue('');
			return;
		}
		const value = parseInt(event.target.value, 10);
		if (value && typeof value === 'number' && !isNaN(value)) {
			setInputValue(value.toString());
		} else {
			setInputValue('0');
		}
	};

	const applyDays = () => {
		if (inputValue === '') {
			return;
		}
		const days = parseInt(inputValue);
		let newData = [...contextObj.data];
		for (let i = 0; i < days; i++) {
			newData = updateQuality(newData);
		}
		contextObj.setData(newData)
		toggle();
	};

	const resetDays = () => {
		contextObj.setData(DATA.map(eachData => ({...eachData})));
		toggle();
	};

	const toggle = () => {
		setIsOpen(prevIsOpen => !prevIsOpen);
	}

	return (
		<OuterContainer>
			<span onClick={toggle}>
				Time Travel
			</span>
			<motion.div initial={false}
				animate={isOpen ? 'open' : 'close'}
				transition={{ ease: "easeOut", duration: 0.15 }}	
				variants={variantObj}
				style={{
					position: "absolute",
					right: '0',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					transformOrigin: 'right top'
				}
			}>
				<TimeTravelControls>
					<input placeholder="Days in number" onChange={onInputChange} value={inputValue} />
					<FlexContainer>
						<StyledButton bgColor="#AFA" onClick={applyDays}>
							Apply
						</StyledButton>
						<Button bgColor="#FAA" onClick={resetDays}>
							Reset
						</Button>
					</FlexContainer>
				</TimeTravelControls>
			</motion.div>
		</OuterContainer>
	);
}

export default TimeTravel;
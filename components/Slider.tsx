import { motion, Variants } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chevron, TextImage } from './CommonStyles';
import { transitionStringTemplate } from '../constants/style';
import { ContextType, ItemType } from '../constants/types';
import { AppContext } from '../pages/_app';

const SliderOuterContainer = styled.div`
	position: relative;
	overflow: hidden;
`;

const SliderItem = styled.div`
	width: 100%;
	height: 300px;
`;

const EmptyButton = styled.button<{left?: string, right?: string}>`
	position: absolute;
	z-index: 10;
	outline: none;
	border: 0;
	top: 50%;
	cursor: pointer;
	transform: translateY(-50%);
	background-color: transparent;
	opacity: 1;
	transition: ${transitionStringTemplate(['opacity'])}
	${props => props.left && `
		left: ${props.left};
	`}
	${props => props.right && `
		right: ${props.right};
	`}
`

type SwipeType = 'left' | 'right';

const Slider = () => {
	const [sliderIndex, setSliderIndex] = useState(0);
	const [variantObj, setVariantObj] = useState<Variants>({});
	const contextObj: ContextType = useContext(AppContext);

	const [closestSellInData, setData] = useState<Array<ItemType>>([]);

	const swipe = (leftOrRight: SwipeType) => {
		if (leftOrRight === 'left') {
			setSliderIndex(prevIndex => (prevIndex - 1 + closestSellInData.length) % closestSellInData.length);
		} else {
			setSliderIndex(prevIndex => (prevIndex + 1 + closestSellInData.length) % closestSellInData.length);
		}
	}

	useEffect(() => {
		const data = contextObj.data.map(eachData => ({...eachData}));
		data.sort((a, b) => {
			if (a.sellIn < b.sellIn) {
				return -1;
			} else if (a.sellIn > b.sellIn) {
				return 1;
			}
			return 0;
		});
		const newData = data.splice(0, 3);
		setData(newData);

		const newVariantObj: Variants = {};
		newData.forEach((eachData, index) => {
			newVariantObj['animation_' + index] = {
				x: `${(index * -100)}%`
			}
		});
		setVariantObj(newVariantObj);
	}, []);
	
	return (
		<SliderOuterContainer>
			{contextObj.data.length > 0 && (
				<EmptyButton left='0'
					onClick={() => swipe('left')}
				>
					<Chevron direction='left'/>
				</EmptyButton>
			)}
			<motion.div initial={false}
				animate={`animation_${sliderIndex}`}
				transition={{ ease: "easeOut", duration: 0.3 }}	
				variants={variantObj}
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${closestSellInData.length}, 100%)`,
				}}
			>
				{closestSellInData.map((eachData) => (
					<SliderItem key={eachData.id}>
						<TextImage>
							<div>
								{eachData.imageText}
							</div>
						</TextImage>
					</SliderItem>
				))}
			</motion.div>
			{closestSellInData.length > 0 && (
				<EmptyButton right='0'
					onClick={() => swipe('right')}
				>
					<Chevron direction='right'/>
				</EmptyButton>
			)}
		</SliderOuterContainer>
	)
}

export default Slider;
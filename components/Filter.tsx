import { useContext } from "react";
import styled from "styled-components";
import { FILTER_DATA } from "../constants/data";
import { THEMES } from "../constants/style";
import { ContextType, FilterOptions } from "../constants/types";
import { AppContext } from "../pages/_app";
import Dropdown, { DropdownDataType } from "./Dropdown";

const FullHeightContainer = styled.div`
	height: 100%;
	margin: 20px 0 0 20px;
`;

const FilterComponent = () => {
	const contextObj: ContextType = useContext(AppContext);

	const onChange = (data: DropdownDataType) => {
		if (data.key === 'all' || data.key === 'general' || data.key === 'rare') {
			contextObj.changeCategory(data.key);
		}
	};

	return (
		<FullHeightContainer>
			<Dropdown data={FILTER_DATA} value={contextObj.category} title='Category' onChange={onChange} />
		</FullHeightContainer>
	);
};

export default FilterComponent;
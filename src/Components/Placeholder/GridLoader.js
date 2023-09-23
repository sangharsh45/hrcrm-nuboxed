import React from 'react';
import ContentLoader from "react-content-loader"
import styled from 'styled-components';

const StyledContentLoader = styled(ContentLoader)`
	background-color: ${props => props.theme.backgroundColor};
	color: ${props => props.theme.color};
`

const GridLoader = props => (
	<StyledContentLoader
		height={160}
		width={400}
		speed={2}
		primaryColor="#d2ddd2"
		secondaryColor="#9abcfc"
		{...props}
	>
		<rect x="208.7" y="34.67" rx="0" ry="0" width="0" height="0" />
		<rect x="10" y="6.67" rx="0" ry="0" width="83.78" height="43.68" />
		<rect x="104" y="6.67" rx="0" ry="0" width="89.64" height="43.68" />
		<rect x="206" y="6.67" rx="0" ry="0" width="87.84" height="43.2" />
		<rect x="305" y="6.67" rx="0" ry="0" width="84.88" height="43" />
		<rect x="39.55" y="53.67" rx="0" ry="0" width="0" height="0" />
		<rect x="70.41" y="40.67" rx="0" ry="0" width="0" height="0" />
		<rect x="10" y="60.28" rx="0" ry="0" width="83" height="42.14" />
		<rect x="105" y="60.28" rx="0" ry="0" width="89.04" height="42.42" />
		<rect x="206" y="60.28" rx="0" ry="0" width="87.87" height="42.14" />
		<rect x="310.49" y="82.28" rx="0" ry="0" width="0" height="0" />
		<rect x="306" y="60.28" rx="0" ry="0" width="84.24" height="42.42" />
		<rect x="341.49" y="85.28" rx="0" ry="0" width="0" height="0" />
	</StyledContentLoader>
);

export default GridLoader;

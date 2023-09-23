import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';

const StyledIcon = styled(Icon)`
    font-size: ${props => props.size ? props.size : '1.5625em'};
    cursor: pointer;
`

const ActionIcon = (props) => {
    const { tooltipTitle, iconType, handleIconClick, ...rest } = props;
    return (
        <Tooltip title={tooltipTitle || ''}>
            <StyledIcon
                type={iconType}
                onClick={handleIconClick}
                {...rest}
            />
        </Tooltip>
    )
};

ActionIcon.propTypes = {
    tooltipTitle: PropTypes.string,
    iconType: PropTypes.string,
    handleIconClick: PropTypes.func,
}
export default ActionIcon;

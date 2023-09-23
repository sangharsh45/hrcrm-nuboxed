import React from 'react'
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from '../../../Components/UI/Layout'

const CallActionLeft = (props) => {
    return (
        <FlexContainer alignItems='center'>
            <ActionIcon
                style={{ marginRight: '0.3rem', color: props.viewType === 'grid' && '#1890ff' }}
                iconType='appstore-o'
                tooltipTitle='GRID VIEW'
                handleIconClick={() => props.setCallViewType('grid')}
            />
            <ActionIcon
                style={{ marginRight: '0.3rem', color: props.viewType === 'table' && '#1890ff'  }}
                iconType='table'
                tooltipTitle='Table VIEW'
                handleIconClick={() => props.setCallViewType('table')}
            />
        </FlexContainer>
    )
}

export default CallActionLeft 
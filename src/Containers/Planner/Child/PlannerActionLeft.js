import React from 'react'
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from '../../../Components/UI/Layout'
import { FormattedMessage } from "react-intl";
import PlannerShareForm from "./PlannerShareForm"
const PlannerActionLeft = (props) => {
    return (
        <FlexContainer alignItems='center'>
            <ActionIcon
                style={{ marginRight: '0.3rem', color: props.viewType === 'table' && '#1890ff' }}
                iconType='appstore-o'
                // tooltipTitle='Back'
                tooltipTitle={
                    <FormattedMessage
                      id="app.back"
                      defaultMessage="Back"
                    />
                  }
               
                handleIconClick={() => props.setPlannerViewType('table')}
            />
            {/* <ActionIcon
                style={{ marginRight: '0.3rem', color: props.viewType === 'dashboard' && '#1890ff'  }}
                iconType='table'
                // tooltipTitle='App'
                tooltipTitle={
                    <FormattedMessage
                      id="app.app"
                      defaultMessage="App"
                    />
                  }
                handleIconClick={() => props.setPlannerViewType('dashboard')}
            /> */}
            {props.viewType==="dashboard"?
            <PlannerShareForm/>
            :null}
        </FlexContainer>
    )
}

export default PlannerActionLeft 
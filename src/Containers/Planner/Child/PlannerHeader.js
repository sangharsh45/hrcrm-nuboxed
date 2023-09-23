import React, { Component } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import PlannerActionLeft from "./PlannerActionLeft";
import PlannerActionRight from './PlannerActionRight';
class PlannerHeader extends Component {
    render() {
        const { viewType, setPlannerViewType } = this.props;
        return (
            <div style={{position: "sticky",
            top: "3.35rem",
            zIndex: "998"}}>
                <ActionHeader
                    leftComponent={<PlannerActionLeft
                        viewType={viewType}
                        setPlannerViewType={setPlannerViewType}
                    />}
                    rightComponent={<PlannerActionRight
                    />}
                />
            </div>
        )
    }
}

export default PlannerHeader;
import React, { Component, Suspense, lazy } from "react";
import { ActionHeader } from '../../../Components/Utils';
const CallActionLeft = lazy(() => import("./CallActionLeft"));
const CallActionRight = lazy(() => import("./CallActionRight"));

class CallHeader extends Component {
    render() {
        const { viewType, setCallViewType } = this.props;
        return (
            <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<CallActionRight
                    />}
                />
            </div>
        )
    }
}

export default CallHeader;
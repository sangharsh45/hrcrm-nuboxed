import React, { Component } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import CallActionLeft from "./CallActionLeft";
import CallActionRight from './CallActionRight';
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
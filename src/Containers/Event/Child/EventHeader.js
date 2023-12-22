import React, { Component,lazy } from 'react'
import { ActionHeader } from '../../../Components/Utils';
const EventActionRight =lazy(()=>import("./EventActionRight"));

class EventHeader extends Component {
    render() {
        // const { viewType, setEventViewType } = this.props;
        return (
            <div style={{position: "sticky",
            top: "3.35rem",
            zIndex: "998"}}>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<EventActionRight
                    />}
                />
            </div>
        )
    }
}

export default EventHeader;
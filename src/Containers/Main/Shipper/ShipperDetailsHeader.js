import React, { Component } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import ShipperDetailsHeaderLeft from "./ShipperDetailsHeaderLeft";

class ShipperDetailsHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={<ShipperDetailsHeaderLeft />}
                    rightComponent={<></>}
                />
            </div>
        )
    }
}

export default ShipperDetailsHeader;
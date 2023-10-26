import React, { Component } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import ShipperActionLeft from './ShipperActionLeft';
import ShipperActionRight from './ShipperActionRight';

class ShipperHeader extends Component {
    render() {
        const {
            viewType,
            setShipperViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleShipperModal,
        } = this.props;

        return (
            <>
                <ActionHeader
                    leftComponent={
                        <ShipperActionLeft
                            viewType={viewType}
                            setShipperViewType={setShipperViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    rightComponent={
                        <ShipperActionRight
                             viewType={viewType}
                            handleShipperModal={handleShipperModal} />
                    }
                />
            </>
        )
    }
}

export default ShipperHeader;

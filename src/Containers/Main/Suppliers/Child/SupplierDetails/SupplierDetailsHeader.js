import React, { Component } from 'react';
import { ActionHeader } from '../../../../../Components/Utils';
import SupplierDetailsHeaderLeft from './SupplierDetailsHeaderLeft';

class SupplierDetailsHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={<SupplierDetailsHeaderLeft />}
                    rightComponent={<></>}
                />
            </div>
        )
    }
}

export default SupplierDetailsHeader;
import React, { Component } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import ImportActionLeft from "./ImportActionLeft";
import ImportActionRight from './ImportActionRight';
class ImportHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={<ImportActionLeft />}
                    rightComponent={<ImportActionRight />}
                />
            </div>
        )
    }
}

export default ImportHeader;
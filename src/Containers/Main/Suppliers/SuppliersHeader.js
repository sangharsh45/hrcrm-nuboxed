import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import SuppliersActionLeft from "./SuppliersActionLeft";
import SuppliersActionRight from "./SuppliersActionRight";

class SuppliersHeader extends Component {
    render() {
        const {
            viewType,
            setSuppliersViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <SuppliersActionLeft
                            viewType={viewType}
                            setSuppliersViewType={setSuppliersViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    rightComponent={<SuppliersActionRight
                        viewType={viewType}
                         />}
                />
            </div>
        );
    }
}

export default SuppliersHeader;

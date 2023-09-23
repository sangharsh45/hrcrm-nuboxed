import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import BillingActionLeft from "./BillingActionLeft";
import BillingActionRight from "./BillingActionRight";
class BillingHeader extends Component {
    render() {
        const {
            handleEmployeeModal,
            viewType,
            setBillingViewType,
        } = this.props;
        return (
            <>
               <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
                    <ActionHeader
                        leftComponent={
                            <BillingActionLeft
                                viewType={viewType}
                                setBillingViewType={setBillingViewType}
                                currentData={this.props.currentData}
                                handleClear={this.props.handleClear}
                                setCurrentData={this.props.setCurrentData}
                            />
                        }
                        rightComponent={
                            <BillingActionRight
                                viewType={viewType}
                                handleEmployeeModal={handleEmployeeModal}
                            />
                        }
                    />
                </div>

                <div>

                </div>
            </>

        );
    }
}

export default BillingHeader;

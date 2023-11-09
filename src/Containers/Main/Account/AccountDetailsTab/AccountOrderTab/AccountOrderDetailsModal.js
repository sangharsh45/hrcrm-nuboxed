import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import AccountOrderDetails from "./AccountOrderDetails";


class AccountOrderDetailsModal extends Component {
    render() {
        const {
            addOrderDetailsModal,
            handleOrderDetailsModal,
            ...formProps
        } = this.props;
        return (
            <>
                {/* - ${this.props.particularRowData.orderId} */}
                <StyledDrawer
                    title={`Phone List `}
                    width="75%"
                    visible={addOrderDetailsModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleOrderDetailsModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountOrderDetails particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountOrderDetailsModal;

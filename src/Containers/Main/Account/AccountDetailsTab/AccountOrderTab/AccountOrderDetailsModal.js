import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import AccountOrderDetails from "./AccountOrderDetails";
import OrderCatalogueDetails from "./OrderCatalogueDetails"


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
                    title={`Order : ${this.props.particularRowData.newOrderNo}`}
                    width="70%"
                    visible={addOrderDetailsModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleOrderDetailsModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {this.props.particularRowData.type === "Catalogue" ?
                            <OrderCatalogueDetails particularRowData={this.props.particularRowData} />
                            : <AccountOrderDetails particularRowData={this.props.particularRowData} />
                        }

                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountOrderDetailsModal;

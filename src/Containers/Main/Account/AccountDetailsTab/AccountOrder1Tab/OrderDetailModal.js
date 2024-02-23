import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const OrderCatalogueDetails = lazy(() => import("./OrderCatalogueDetails"));

class OrderDetailModal extends Component {
    render() {
        const {
            showProductList,
            handleProductOrderDetailsModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Order : ${this.props.particularRowData.newOrderNo}`}
                    width="80%"
                    visible={showProductList}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleProductOrderDetailsModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <OrderCatalogueDetails particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default OrderDetailModal;

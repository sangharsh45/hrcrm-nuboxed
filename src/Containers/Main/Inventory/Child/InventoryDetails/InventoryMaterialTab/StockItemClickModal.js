import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import PartNoListItemWise from "./PartNoListItemWise";

class StockItemClickModal extends Component {
    render() {
        const {
            showStockItem,
            handleSTockItemModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Item - ${this.props.row.suppliesFullName}`}
                    width="70%"
                    visible={showStockItem}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleSTockItemModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <PartNoListItemWise poSupplierSuppliesId={this.props.row.poSupplierSuppliesId} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default StockItemClickModal;

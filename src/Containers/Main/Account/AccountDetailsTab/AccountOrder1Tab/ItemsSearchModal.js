import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import SearchProductInInventory from "./SearchProductInInventory";

class ItemsSearchModal extends Component {
    render() {
        const {
            searchItemsInLocation,
            handleSearchItem,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Order No - ${this.props.particularRowData.newOrderNo}`}
                    width="60%"
                    visible={searchItemsInLocation}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleSearchItem(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SearchProductInInventory particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ItemsSearchModal;

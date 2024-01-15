import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import CustomerProductOfferForm from "./CustomerProductOfferForm";
import { StyledTabs } from "../../../../Components/UI/Antd";
import DistributorProductOfferForm from "./DistributorProductOfferForm";

const TabPane = StyledTabs.TabPane;

class ProductOfferModal extends Component {
    render() {
        const {
            addProductOfferModal,
            handleOfferModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledModal
                    title="Offer"
                    width="50%"
                    visible={addProductOfferModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleOfferModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <ProductDiscountForm particularDiscountData={this.props.particularDiscountData}/> */}
                        <StyledTabs defaultActiveKey="1">
                            <TabPane tab={`Distributor`} key="1">
                                <div style={{ marginTop: 20 }}>
                                    <DistributorProductOfferForm particularDiscountData={this.props.particularDiscountData} />
                                </div>
                            </TabPane>
                            <TabPane tab={`Customer`} key="2">
                                <div style={{ marginTop: 20 }}>
                                    <CustomerProductOfferForm particularDiscountData={this.props.particularDiscountData} />
                                </div>
                            </TabPane>

                        </StyledTabs>
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default ProductOfferModal;

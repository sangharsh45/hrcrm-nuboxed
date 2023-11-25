import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
// import CustomerProductDiscountForm from "./CustomerProductDiscountForm";
import { StyledTabs } from "../../../../Components/UI/Antd";
import DistributorProductDiscountForm from "./DistributorProductDiscountForm";

const TabPane = StyledTabs.TabPane;

class ProductDiscountModal extends Component {
    render() {
        const {
            addDiscountModal,
            handleDiscountModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledModal
                    title="Discount"
                    width="30%"
                    visible={addDiscountModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleDiscountModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <ProductDiscountForm particularDiscountData={this.props.particularDiscountData}/> */}
                        <StyledTabs defaultActiveKey="1">
                            {/* <TabPane tab={`Customer`} key="1">
                                <div style={{ marginTop: 10 }}>
                                    <CustomerProductDiscountForm particularDiscountData={this.props.particularDiscountData} />
                                </div>
                            </TabPane> */}
                            <TabPane tab={`Distributor`} key="2">
                                <div style={{ marginTop: 10 }}>
                                    <DistributorProductDiscountForm particularDiscountData={this.props.particularDiscountData} />
                                </div>
                            </TabPane>
                        </StyledTabs>
                    </Suspense>
                </StyledModal>
            </>
        );
    }
}

export default ProductDiscountModal;

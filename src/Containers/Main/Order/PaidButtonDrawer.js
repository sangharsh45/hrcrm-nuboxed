import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import DistributorPaidForm from "../Account/AccountDetailsTab/AccountOrderTab/DistributorPaidForm";
const OrderPaymentTable =lazy(()=>import("../Account/AccountDetailsTab/AccountOrderTab/OrderPaymentTable"));

class PaidButtonDrawer extends Component {
    render() {
        const {
            addPaidButtonModal,
            handlePaidModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Collection"
                    width="60%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handlePaidModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <DistributorPaidForm particularRowData={this.props.particularRowData} />
                        <OrderPaymentTable particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default PaidButtonDrawer;

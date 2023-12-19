import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import DistributorPaidForm from "../Account/AccountDetailsTab/AccountOrderTab/DistributorPaidForm";
import OrderPaymentTable from "../Account/AccountDetailsTab/AccountOrderTab/OrderPaymentTable";

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
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"3rem"}}
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

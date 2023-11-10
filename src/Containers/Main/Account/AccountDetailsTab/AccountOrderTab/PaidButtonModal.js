import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import OrderPaymentTable from "./OrderPaymentTable";
const DistributorPaidForm = lazy(() => import("./DistributorPaidForm"));
class PaidButtonModal extends Component {
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
                    width="50%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"5rem"}}
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

export default PaidButtonModal;

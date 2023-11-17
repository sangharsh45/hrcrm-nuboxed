import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import OrderPaymentTable from "./OrderPaymentTable";
// import OrderPaymentTable from "./OrderPaymentTable";
// const DistributorPaidForm = lazy(() => import("./DistributorPaidForm"));
class ShowPaymentHistoryModal extends Component {
    render() {
        const {
            showPaymentHistoryModal,
            handlePaymentHistory,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Reason"
                    width="50%"
                    visible={showPaymentHistoryModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "5rem" }}
                    onClose={() => handlePaymentHistory(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <OrderPaymentTable particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ShowPaymentHistoryModal;

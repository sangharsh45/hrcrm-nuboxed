import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import RepairReasonForm from "./RepairReasonForm";
// import OrderPaymentTable from "./OrderPaymentTable";
// const DistributorPaidForm = lazy(() => import("./DistributorPaidForm"));
class StartRepairReasonModal extends Component {
    render() {
        const {
            showRepairReasonModal,
            handleRepairReason,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Reason"
                    width="50%"
                    visible={showRepairReasonModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "5rem" }}
                    onClose={() => handleRepairReason(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <RepairReasonForm particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default StartRepairReasonModal;

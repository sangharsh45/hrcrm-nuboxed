import React, { Component, Suspense, lazy } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ConsumptionReasonForm = lazy(() => import("./ConsumptionReasonForm"));
class ConsumptionReasonModal extends Component {
  render() {
    const {
      consumptionReasonModal,
      handleConsumptionReasonModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Reason"
          width="60%"
          height="45%"
          visible={consumptionReasonModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleConsumptionReasonModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ConsumptionReasonForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default ConsumptionReasonModal;

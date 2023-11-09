import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
const DeputeForm = lazy(() => import("./DeputeForm"));
class DeputeButtonModal extends Component {
  render() {
    // console.log(this.props.leadsId)
    const {
      deputeButtonModal,
      handleDeputeButtonModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Allocate Production Executive"
          width="45%"
          visible={deputeButtonModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleDeputeButtonModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <DeputeForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default DeputeButtonModal;

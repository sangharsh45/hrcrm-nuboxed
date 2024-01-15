import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ShipperPauseForm = lazy(() => import("./ShipperPauseForm"));

class PauseButtonModal extends Component {
  render() {
    const {
      addPauseButtonModal,
      handlePauseButtonModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Pause"
          width="25%"
          visible={addPauseButtonModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handlePauseButtonModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ShipperPauseForm
              particularRowData={this.props.particularRowData}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default PauseButtonModal;

import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ShipperRenewalForm = lazy(() => import("./ShipperRenewalForm"));

class RenewalButtonModal extends Component {
  render() {
    const {
      addRenewalButtonModal,
      handleRenewalButtonModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Renewal"
          width="30%"
          visible={addRenewalButtonModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleRenewalButtonModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ShipperRenewalForm
              particularRowData={this.props.particularRowData}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default RenewalButtonModal;

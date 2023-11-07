import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ShipperPaidForm = lazy(() => import("./ShipperPaidForm"));

class PaidButtonModal extends Component {
  render() {
    const { addPaidButtonModal, handlePaidModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Payment"
          width="25%"
          visible={addPaidButtonModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handlePaidModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ShipperPaidForm particularRowData={this.props.particularRowData} />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default PaidButtonModal;

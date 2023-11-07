import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ShipperDeleteOrderForm = lazy(() => import("./ShipperDeleteOrderForm"));
class ShipperDeleteOrderModal extends Component {
  render() {
    const {
      addDeleteOrderModal,
      handleDeleteOrderModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Reason For Delete"
          width="25%"
          visible={addDeleteOrderModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleDeleteOrderModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ShipperDeleteOrderForm
              particularRowData={this.props.particularRowData}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default ShipperDeleteOrderModal;

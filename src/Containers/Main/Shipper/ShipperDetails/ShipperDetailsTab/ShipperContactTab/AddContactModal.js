import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";

import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";

const ContactShipperForm = lazy(() => import("./ContactShipperForm"));

const ButtonGroup = Button.Group;

class AddContactModal extends Component {
  render() {
    const { shipperContactModal, handleShipperContactModal } = this.props;
    return (
      <>
        <StyledModal
          title="Contact"
          width="65vw"
          visible={shipperContactModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleShipperContactModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ContactShipperForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}
export default AddContactModal;

import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";

import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";

const ContactShipperForm = lazy(() => import("./ContactShipperForm"));

const ButtonGroup = Button.Group;

class AddContactModal extends Component {
  render() {
    const { shipperContactModal, handleShipperContactModal } = this.props;
    return (
      <>
        <StyledDrawer
          title="Contact"
          width="55vw"
          visible={shipperContactModal}
          closable
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleShipperContactModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ContactShipperForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}
export default AddContactModal;

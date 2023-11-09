import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../../Components/UI/Antd";
import PickUpForm from "./PickUpForm";
// const Stepper = lazy(() => import("./Stepper/Stepper"));

class PickUpDateModal extends Component {
  render() {
    // console.log(this.props.leadsId)
    const {
      pickUpModal,
      handlePickupModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Dispatch"
          width="40%"
          // height="40%"
          visible={pickUpModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onClose={() => handlePickupModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PickUpForm orderPhoneId={this.props.orderPhoneId}
              locationDetailsId={this.props.locationDetailsId} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default PickUpDateModal;

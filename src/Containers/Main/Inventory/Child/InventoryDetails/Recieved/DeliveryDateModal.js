import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const AddDeliveryDateForm = lazy(() => import("./AddDeliveryDateForm"));

class DeliveryDateModal extends Component {
  render() {
    const {
      addDeliverDate,
      handleDeliveryDateModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          title="Send to production"
          width="30%"
          height="45%"
          visible={addDeliverDate}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleDeliveryDateModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddDeliveryDateForm rowData={this.props.rowData} />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default DeliveryDateModal;

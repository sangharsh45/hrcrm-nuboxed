import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
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
        <StyledDrawer
          title="Send to production"
          width="30%"
          height="45%"
          visible={addDeliverDate}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleDeliveryDateModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddDeliveryDateForm rowData={this.props.rowData} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default DeliveryDateModal;

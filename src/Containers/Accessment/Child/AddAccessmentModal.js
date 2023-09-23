import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

 const AccessmentForm = lazy(() => import("../Child/AccessmentForm"));
const TabPane = StyledTabs.TabPane;

class AddAccessmentModal extends Component {
  render() {
    const { addAccessmentModal, handleAccessmentModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          //title="New Joinee"
          title={<FormattedMessage
            id="app.accessment"
            defaultMessage="Add Accessment"
          />}

          width="55%"
          visible={addAccessmentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onCancel={() => handleAccessmentModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <AccessmentForm />{" "}
        </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddAccessmentModal;

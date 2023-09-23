import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateEmploymentForm = lazy(() =>
  import("../Employment/UpdateEmploymentForm")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      updateEmploymentModal,
      handleUpdateEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Employment"
          title={<FormattedMessage
            id="app.employment"
            defaultMessage="Employment"
          />}
          width="30%"
          visible={updateEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onClose={() => handleUpdateEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateEmploymentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmploymentModal;

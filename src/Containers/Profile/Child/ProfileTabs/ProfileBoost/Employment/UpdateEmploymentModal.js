import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateEmploymentForm = lazy(() =>
  import("../Employment/UpdateEmploymentForm")
);

class UpdateEmploymentModal extends Component {
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
          title={
            <FormattedMessage id="app.employment" defaultMessage="Employment" />
          }
          width="60%"
          visible={updateEmploymentModal}
          destroyOnClose
          maskClosable={false}

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

export default UpdateEmploymentModal;

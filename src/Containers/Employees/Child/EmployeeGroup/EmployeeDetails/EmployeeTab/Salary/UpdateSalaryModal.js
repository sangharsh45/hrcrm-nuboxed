import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateSalaryForm = lazy(() => import("../Salary/UpdateSalaryForm"));

class UpdateSalaryModal extends Component {
  render() {
    const {
      updateSalaryModal,
      handleUpdateSalaryModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Salary"
          title={<FormattedMessage
            id="app.salaray"
            defaultMessage="Salary"
          />}
          width="30%"
          visible={updateSalaryModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onClose={() => handleUpdateSalaryModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateSalaryForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateSalaryModal;

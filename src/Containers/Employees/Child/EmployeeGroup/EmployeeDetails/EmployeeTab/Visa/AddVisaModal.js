import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import UserVisaForm from "./UserVisaForm";

// const EducationDocumentForm = lazy(() =>
//   import("../Education/EducationDocumentForm")
// );

class AddVisaModal extends Component {
  render() {
    const {
        addVisaModal,
        handleVisaModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.visa"
            defaultMessage="Visa"
          />}
          width="60%"
          visible={addVisaModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleVisaModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UserVisaForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddVisaModal;

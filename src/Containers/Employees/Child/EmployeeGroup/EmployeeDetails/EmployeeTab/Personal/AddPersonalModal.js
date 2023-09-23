import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import PersonalDocumentForm from "./PersonalDocumentForm";

class AddPersonalModal extends Component {
  render() {
    const { addPersonalModal, handlePersonalModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Emergency Contact"
          title={<FormattedMessage
            id="app.emergencycontact"
            defaultMessage="Emergency Contact"
          />}
          width="55%"
          visible={addPersonalModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handlePersonalModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddPersonalModal;

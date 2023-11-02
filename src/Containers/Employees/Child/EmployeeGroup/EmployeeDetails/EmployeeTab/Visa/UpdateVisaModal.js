import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import UpdateVisaForm from "./UpdateVisaForm";


class UpdateVisaModal extends Component {
  render() {
    const {
        updateVisaModal,
        handleUpdateVisaModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Education"
          title={<FormattedMessage
            id="app.visa"
            defaultMessage="Visa"
          />}
          width="60%"
          visible={updateVisaModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleUpdateVisaModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateVisaForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateVisaModal;

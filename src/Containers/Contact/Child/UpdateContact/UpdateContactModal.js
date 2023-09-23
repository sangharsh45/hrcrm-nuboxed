import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactForm = lazy(() => import("./UpdateContactForm"));

const UpdateContactModal = props => {
  const { updateContactModal, handleUpdateContactModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        // title={<FormattedMessage
        //   id="app.contact"
        //   defaultMessage="Contact"
        // />}
        title={props.contactData.fullName}
        width="55%"
        visible={updateContactModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleUpdateContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateContactForm contactId={props.contactData.contactId} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateContactModal;

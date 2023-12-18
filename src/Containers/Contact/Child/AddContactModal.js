import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactForm = lazy(() => import("./ContactForm"));

const AddContactModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { addContactModal, handleContactModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width={drawerWidth}
        visible={addContactModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => handleContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactModal;

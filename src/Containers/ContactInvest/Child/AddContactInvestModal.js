import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactInvestForm = lazy(() => import("./ContactInvestForm"));

function AddContactInvestModal (props) {
  const { addContactInvestModal, handleContactInvestModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contactinvest "
          defaultMessage="Contact Invest"
        />}
        width={drawerWidth}
        visible={addContactInvestModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleContactInvestModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactInvestForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactInvestModal;

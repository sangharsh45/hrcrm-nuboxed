import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const DealContactForm = lazy(() => import("./DealContactForm"));

const DealContactModal = (props) => {
  const { openDealContactModal, handleDealContactModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="60%"
        visible={openDealContactModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => handleDealContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <DealContactForm {...formProps} />
     
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default DealContactModal;

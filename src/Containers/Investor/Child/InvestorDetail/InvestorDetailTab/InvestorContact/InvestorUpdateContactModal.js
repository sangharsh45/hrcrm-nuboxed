import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
 const UpdateInvestorContactForm = lazy(() => import("./UpdateInvestorContactForm"));

const InvestorUpdateContactModal = (props) => {
  const {currentRowData,invstrContactUpdateModal,handleUpdateInvestorContactModal,...formProps } = props;

  return (
    <>
      <StyledDrawer
         title={
          <FormattedMessage id="app.contact" defaultMessage="Contact" />
        }
        width="55%"
        visible={invstrContactUpdateModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleUpdateInvestorContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateInvestorContactForm 
           currentRowData={currentRowData} 
          /> {" "}
  
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default InvestorUpdateContactModal;

import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import UpdateLeadsContactForm from "./UpdateLeadsContactForm";
//  const UpdateLeadsContactForm = lazy(() => import("./UpdateCustomerContactForm"));

const AddLeadsUpdateContactModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
         title={
          <FormattedMessage id="app.contact" defaultMessage="Contact" />
        }
        width="55%"
        visible={props.addUpdateLeadsContactModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleUpdateLeadsContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeadsContactForm 
           contactId={props.contactId} 
          /> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddLeadsUpdateContactModal;

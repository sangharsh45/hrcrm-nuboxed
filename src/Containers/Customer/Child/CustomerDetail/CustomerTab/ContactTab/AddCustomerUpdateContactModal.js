import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
 const UpdateCustomerContactForm = lazy(() => import("./UpdateCustomerContactForm"));

const AddCustomerUpdateContactModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
         title={
          <FormattedMessage id="app.contact" defaultMessage="Contact" />
        }
        width="60%"
        visible={props.addUpdateCustomerContactModal}
        onClose={() => props.handleUpdateCustomerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerContactForm 
            defaultCustomers={props.defaultCustomers}
            customerId={props.customerId}
           contactId={props.contactId} 
          /> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerUpdateContactModal;

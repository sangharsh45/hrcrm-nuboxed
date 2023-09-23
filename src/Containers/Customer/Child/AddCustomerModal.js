import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CustomerForm = lazy(() => import("./CustomerForm"));

const AddCustomerModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.addCustomerModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleCustomerModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerModal;

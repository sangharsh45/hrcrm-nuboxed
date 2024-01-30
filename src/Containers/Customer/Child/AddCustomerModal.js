import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CustomerForm = lazy(() => import("./CustomerForm"));

const AddCustomerModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const handleClose = () => {
      window.location.reload(true);
    };

    
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />}
        width={drawerWidth}
        style={{marginTop:"3rem"}}
        visible={props.addCustomerModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          handleClose();
          props.handleCustomerModal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerModal;

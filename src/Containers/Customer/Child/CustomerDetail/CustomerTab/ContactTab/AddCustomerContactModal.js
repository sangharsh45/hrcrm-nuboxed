import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {handleCustomerContactModal} from "../../../../CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CustomerContactForm = lazy(() =>
  import("../ContactTab/CustomerContactForm")
);

const AddCustomerContactModal = (props) => {
  const {
    addCustomerContactModal,
    handleCustomerContactModal,
    ...formProps
  } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="55%"
        visible={addCustomerContactModal}
        closable
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }} 
        style={{marginTop:"5rem"}}
        onClose={() => handleCustomerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerContactForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ customer}) => ({
  addCustomerContactModal:customer.addCustomerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerContactModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerContactModal);

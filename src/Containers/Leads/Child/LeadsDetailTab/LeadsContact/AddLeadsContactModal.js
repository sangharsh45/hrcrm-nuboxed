import React, { Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import {handleLeadsContactModal} from "../../../LeadsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsContactForm from "./LeadsContactForm";

const AddLeadsContactModal = (props) => {
  const {
    addLeadsContactModal,
    handleLeadsContactModal,
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
        visible={addLeadsContactModal}
        closable
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }} 
        style={{ marginTop:"5rem" }}
        onClose={() => handleLeadsContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsContactForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ leads}) => ({
  addLeadsContactModal:leads.addLeadsContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleLeadsContactModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddLeadsContactModal);

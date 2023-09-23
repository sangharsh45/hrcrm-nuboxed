import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import LinkTagCustomerForm from "../OpportunityCards/LinkTagCustomerForm"
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {linktagCustomer} from "../../../OpportunityAction";
//import { getCustomerListByUserId } from "../../../../Customer/CustomerAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
// const OpportunityForm = lazy(() => import("./OpportunityForm"));

const LinkTagContactModal = (props) => {
  // useEffect(() => {
  //  props.getCustomerListByUserId(props.userId)
  // }, []);
  const { ...formProps } = props;


  return (
    <>
       <StyledModal
          title={<FormattedMessage
            id="app.tagcustomer"
            defaultMessage="Tag Customer"
          />}
          width="35%"
          visible={props.linkContactModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={props.handleLinkContactModalVisible}
          footer={null}
        >
       
          <LinkTagCustomerForm
           opportunityId={props.opportunityId}
          />
        </StyledModal>
    </>
  );
};
const mapStateToProps = ({ customer,auth,opportunity}) => ({
    // customerByUserId:customer.customerByUserId,
    userId: auth.userDetails.userId,
    linkingtagCustomerOpportunity:opportunity.linkingtagCustomerOpportunity,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        //  getCustomerListByUserId,
        linktagCustomer
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(LinkTagContactModal);



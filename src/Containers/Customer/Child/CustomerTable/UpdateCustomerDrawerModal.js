import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { Tooltip, Icon, Button, Input } from "antd";
import { getCustomerDetailsById } from "../../CustomerAction";
import {
  getCustomerDocument,
  handleUpdateCustomerDrawerModal,
} from "../../CustomerAction";
import { setEditCustomer } from "../../CustomerAction";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import CustomerAddressData from "../CustomerDetail/CustomerAddressData";
import CustomerExtraDetailView from "../CustomerDetail/CustomerCards/CustomerExtraDetailView";
import CustomerCardAddress from "../CustomerCardAddress/CustomerCardAddress";
import CustomerCardDetail from "../CustomerCardAddress/CustomerCardDetail";
import UpdateCustomerForm from "../UpdateCustomer/UpdateCustomerForm";
import UpdateCardCustomerForm from "../UpdateCustomer/UpdateCardCustomerForm";
// import CustomerDetailView from "../CustomerDetail/CustomerCards/CustomerDetailView";

class UpdateCustomerDrawerModal extends Component {
  // componentDidMount() {
  //   this.props.getCustomerDetailsById(
  //     this.props.updateCustomerDrawerProps.customerId
  //   );
  // }

  render() {
    console.log(this.props.updateCustomerDrawerProps.customerId);
    const {
      updateCustomerDrawerProps: { name },
      handleUpdateCustomerDrawerModal,
      customer,
      opportunityDrawerVisible,
    } = this.props;

    return (
      <div className="pulse-background">
        <StyledDrawer
          title={name}
          width="45em"
          style={{ marginTop: "5rem" }}
          visible={this.props.updateDrawerCustomerModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() =>
            this.props.handleUpdateCustomerDrawerModal(
              this.props.updateCustomerDrawerProps,
              false
            )
          }
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCardCustomerForm customer={this.props.customerId} />{" "}
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, employee, customer }) => ({
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
  setEditingCustomer: customer.setEditingCustomer,
  updateCustomerDrawerProps: customer.updateCustomerDrawerProps,
  updateDrawerCustomerModal: customer.updateDrawerCustomerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateCustomerDrawerModal,
      getCustomerDetailsById,
      setEditCustomer
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerDrawerModal);

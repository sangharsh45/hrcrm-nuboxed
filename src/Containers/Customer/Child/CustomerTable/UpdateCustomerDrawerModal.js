import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { getCustomerDetailsById } from "../../CustomerAction";
import {
  handleUpdateCustomerDrawerModal,
} from "../../CustomerAction";
import { setEditCustomer } from "../../CustomerAction";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateCardCustomerForm = lazy(() =>
  import("../UpdateCustomer/UpdateCardCustomerForm")
);


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
          width="55em"
          visible={this.props.updateDrawerCustomerModal}
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

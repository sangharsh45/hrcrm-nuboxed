import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { FlexContainer } from "../../Components/UI/Layout";
import { GroupView } from "../../Components/Common";
import { NoData } from "../../Components/UI/Elements";
import {
  getCustomerRequirement,
  getLatestCustomer,
  getCustomerCloser,
  getAllCustomerByCloser,
  getAllCustomerByAlphabet,
  getAllCustomerByPosition,
  handleCustomerDrawerModal,
  handleUpdateCustomerDrawerModal,
} from "../Customer/CustomerAction";

import SingleCardView from "./SingleCardView";
import AddCustomerDrawerModal from "./AddCustomerDrawerModal";
import UpdateCustomerDrawerModal from "./Child/CustomerTable/UpdateCustomerDrawerModal";

class CustomerCardView extends Component {
  componentDidMount() {
    const {
      user: { userId },
      getLatestCustomer,
      getCustomerRequirement,
      getCustomerCloser,
    } = this.props;
    const startDate = moment()
      .startOf("month")
      .toISOString();
    const endDate = moment()
      .endOf("month")
      .toISOString();
    if (userId) {
      // getCustomerListByUserId(userId);
      getLatestCustomer(userId);
      getCustomerRequirement(userId);
      getCustomerCloser(userId, startDate, endDate);
    }
  }
  handleOnViewMoreTopValue = () => {
    const {
      user: { userId },
      getAllCustomerByAlphabet,
    } = this.props;

    if (userId) {
      getAllCustomerByAlphabet(userId);
    }
  };
  handleOnViewMorePosition = () => {
    const {
      user: { userId },
      getAllCustomerByPosition,
    } = this.props;

    if (userId) {
      getAllCustomerByPosition(userId);
    }
  };
  handleOnViewMoreCloser = () => {
    const {
      user: { userId },
      getAllCustomerByCloser,
    } = this.props;
    const startDate = moment()
      .startOf("month")
      .toISOString();
    const endDate = moment()
      .endOf("month")
      .toISOString();

    if (userId) {
      getAllCustomerByCloser(userId, startDate, endDate);
    }
  };

  render() {
    const {
      user,
      fetchingCustomers,
      customerByUserId,
      latestCustomer,
      fetchinglatestCustomer,
      handleCustomerDrawerModal,
      handleUpdateCustomerDrawerModal,
      customerRequirement,
      fetchingCustomerRequirement,
      customerCloser,
      fetchingCustomerCloser,
    } = this.props;
    console.log(customerByUserId);
    return (
      <>
        <br />
        <div class="max-sm:overflow-x-auto h-[34rem]">
        <GroupView
          groupTitle="On-boarded this month"
          isFetching={fetchingCustomerCloser}
          noData={!customerCloser.length}
          isLoading={this.props.fetchingAllCustomerByCloser}
          length={customerCloser.length}
          onViewmore={this.handleOnViewMoreCloser}
        >
          {(isViewAll) =>
            !isViewAll ? (
              <FlexContainer>
                {customerCloser &&
                  customerCloser.slice(0, 5).map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        // stages={stages}
                        customer={customer}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </FlexContainer>
            ) : (
              <FlexContainer>
                {customerCloser &&
                  customerCloser.map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        // stages={stages}
                        customer={customer}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </FlexContainer>
            )
          }
        </GroupView>

        {/* <GroupView
          groupTitle="Positions"
          isFetching={fetchingCustomerRequirement}
          noData={!customerRequirement.length}
          length={customerRequirement.length}
          isLoading={this.props.fetchingAllCustomerByPosition}
          onViewmore={this.handleOnViewMorePosition}
        >
          {(isViewAll) =>
            !isViewAll ? (
              <FlexContainer>
                {customerRequirement &&
                  customerRequirement.slice(0, 5).map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        // stages={stages}
                        customer={customer}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </FlexContainer>
            ) : (
              <FlexContainer>
                {customerRequirement &&
                  customerRequirement.map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        // stages={stages}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        customer={customer}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </FlexContainer>
            )
          }
        </GroupView> */}

        <GroupView
          groupTitle="ALL"
          isFetching={fetchinglatestCustomer}
          noData={!latestCustomer.length}
          isLoading={this.props.fetchingAllCustomerByAlphabet}
          length={latestCustomer.length}
          onViewmore={this.handleOnViewMoreTopValue}
        >
          {(isViewAll) =>
            !isViewAll ? (
              <FlexContainer>
                {latestCustomer &&
                  latestCustomer.slice(0, 5).map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        // stages={stages}
                        customer={customer}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        // handleOpportunityDrawer={handleOpportunityDrawer}
                      />
                    );
                  })}
              </FlexContainer>
            ) : (
              <FlexContainer>
                {latestCustomer &&
                  latestCustomer.map((customer, i) => {
                    return (
                      <SingleCardView
                        key={customer.customerId}
                        user={user}
                        handleCustomerDrawerModal={handleCustomerDrawerModal}
                        handleUpdateCustomerDrawerModal={handleUpdateCustomerDrawerModal}
                        // stages={stages}
                        customer={customer}
                      />
                    );
                  })}
              </FlexContainer>
            )
          }
        </GroupView>
        </div>
        <AddCustomerDrawerModal />
        < UpdateCustomerDrawerModal
         
          />

      </>
    );
  }
}

const mapStateToProps = ({ auth, customer, account }) => ({
  user: auth.userDetails,
  customerCloser: customer.customerCloser,
  fetchingCustomerCloser: customer.fetchingCustomerCloser,
  latestCustomer: customer.latestCustomer,
  fetchinglatestCustomer: customer.fetchinglatestCustomer,
  fetchinglatestCustomerError: customer.fetchinglatestCustomerError,

  customerRequirement: customer.customerRequirement,
  fetchingCustomerRequirement: customer.fetchingCustomerRequirement,
  fetchingAllCustomerByCloser: customer.fetchingAllCustomerByCloser,
  fetchingAllCustomerByPosition: customer.fetchingAllCustomerByPosition,

  customerByUserId: customer.customerByUserId,
  fetchingCustomerCloser: customer.fetchingCustomerCloser,
  customerCloser: customer.customerCloser,


  customerByUserId: customer.customerByUserId,
  fetchingAllCustomerByAlphabet: customer.fetchingAllCustomerByAlphabet,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLatestCustomer,
      getCustomerRequirement,
      getCustomerCloser,
      getAllCustomerByAlphabet,
      getAllCustomerByCloser,
      getAllCustomerByPosition,
      handleCustomerDrawerModal,
      handleUpdateCustomerDrawerModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardView);

import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerDetailsById } from "../../CustomerAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
const CustomerDetailRight=lazy(()=> import("./CustomerDetailRight"));
const CustomerDetailLeft=lazy(()=> import("./CustomerDetailLeft"));
const CustomerDetailHeader=lazy(()=> import("./CustomerDetailHeader"));

class CustomerDetail extends Component {
  componentDidMount() {
    this.props.getCustomerDetailsById(this.props.match.params.customerId);
  }
  render() {
    const { customer, fetchingCustomerDetailsById } = this.props;
    return (
      <>
        <>
          <CustomerDetailHeader />
          {fetchingCustomerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full max-sm:flex-col max-sm:overflow-x-auto max-sm:h-[63vh]"
                >
                    <div class=" w-1/4 max-sm:w-full">
                      <CustomerDetailLeft customer={customer} />
                    </div>
                    <div class=" w-3/4 max-sm:w-full">
                      <CustomerDetailRight customer={customer} />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDetailsById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)
);

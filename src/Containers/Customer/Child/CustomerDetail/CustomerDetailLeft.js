import React, { Component,lazy} from "react";
const CustomerOverviewCard =lazy(()=> import("./CustomerCards/CustomerOverViewCard"));
const CustomerDetailCard =lazy(()=> import("./CustomerCards/CustomerDetailCard"));
const CustomerExtraDetailCard =lazy(()=> import("./CustomerCards/CustomerExtraDetailCard"));
// const CustomerTopicOfIntrest =lazy(()=> import("../CustomerDetail/CustomerCards/CustomerTopicOfInterest"));
class CustomerDetailLeft extends Component {
  render() {
    const { customer } = this.props;
    return (
      <>
        <div class=" flex flex-col">
          <CustomerOverviewCard customer={customer} />
          {/* <CustomerTopicOfIntrest customer={customer} /> */}
          <CustomerExtraDetailCard customer={customer} />         
          <CustomerDetailCard customer={customer} />
        </div>
      </>
    );
  }
}
export default CustomerDetailLeft;

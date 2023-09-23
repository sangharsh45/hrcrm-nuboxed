import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import CustomerCardDetail from "./CustomerCardDetail";
import CustomerCardForm from "./CustomerCardForm";
// import KvkData from "./KvkData";


class CustomerCardAddress extends Component {
  render() {
    console.log(this.props.customer)
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CustomerCardForm
              customer={customer}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CustomerCardDetail
              customer={customer}            
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CustomerCardAddress;

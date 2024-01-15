import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class CustomerOverView extends Component {
  render() {
    const {
      customer: { name },
      toggleViewType,
      customer,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-wk items-center"
          >
            <div style={{ width: "15%" }}>
              <MultiAvatar
                primaryTitle={customer.name}
                imageId={customer.imageId}
                imageURL={customer.imageURL}
              />
            </div>
            <div class=" flex flex-col w-wk">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${name || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CustomerOverView;

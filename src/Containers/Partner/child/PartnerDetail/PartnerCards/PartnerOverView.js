import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

class PartnerOverView extends Component {
  render() {
    const {
      partner: { partnerName },
      toggleViewType,
      partner,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-4/6"
          >
            <div class=" w-1/2">
              <MultiAvatar
                primaryTitle={partner.partnerName}
                imageId={partner.imageId}
                imageURL={partner.imageURL}
              />
            </div>
            &nbsp;
            <div class=" flex flex-col w-2/3" >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"22px"}
              >
                {`${partnerName || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PartnerOverView;

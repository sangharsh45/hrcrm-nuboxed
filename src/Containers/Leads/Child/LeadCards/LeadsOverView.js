import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";

class LeadsOverView extends Component {
  render() {
    const {
      lead: { name },
      toggleViewType,
      lead,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex justify-start flex-nowrap w-8/12"
          >
            <div class=" w-1/6">
              <MultiAvatar
                primaryTitle={lead.name}
                imageId={lead.imageId}
                imageURL={lead.imageURL}
              />
            </div>
            <div class=" flex flex-col w-8/12 " >
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
export default LeadsOverView;

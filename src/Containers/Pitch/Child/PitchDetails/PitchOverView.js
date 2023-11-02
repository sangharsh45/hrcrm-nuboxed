import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";

class PitchOverView extends Component {
  render() {
    const {
      pitch: { firstName },
      toggleViewType,
      pitch,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex justify-start flex-nowrap w-8/12"
          >
            <div class=" w-1/6">
              <MultiAvatar
                primaryTitle={pitch.firstName}
                imageId={pitch.imageId}
                // imageURL={lead.imageURL}
              />
            </div>
            <div class=" flex flex-col w-8/12 " >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${firstName || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PitchOverView;

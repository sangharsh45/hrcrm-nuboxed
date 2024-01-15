import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";

class CandidateOverView extends Component {
  render() {
    const {
      candidate: { firstName, middleName, lastName },
      toggleViewType,
      candidate,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex justify-start flex-no-wrap w-[70%]"
         
          >
            <div class=" w-[25%]">
              <MultiAvatar
                primaryTitle={candidate.firstName}
                imageId={candidate.imageId}
                imageURL={candidate.imageURL}
              />
            </div>
            &nbsp;
            <div class=" flex flex-col w-[70%]" >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${firstName || ""} ${middleName || ""} ${lastName || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CandidateOverView;

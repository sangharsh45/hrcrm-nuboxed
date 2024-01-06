import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";

class ProgramOverView extends Component {
  render() {
    const {
        program: { program },
    } = this.props;

    return (
      <>
        <div class="flex justify-between">
          <div class="flex start-0 flex-nowrap w-[70%]">
            <div class="w-[15%]">
              <MultiAvatar
                 primaryTitle={program.program}
                imageId={program.imageId}
                imageURL={program.imageURL}
              />
            </div>
            <div class="flex-col w-[70%]">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${program || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ProgramOverView;

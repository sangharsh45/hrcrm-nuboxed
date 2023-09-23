import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../Components/UI/Elements";

class CourseOverView extends Component {
  render() {
    const {
      course: { courseName },
      toggleViewType,
      course,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between"> 
          <div class=" flex justify-start flex-nowrap w-4/6"
          >
            <div class=" w-1/6">
              <MultiAvatar
                primaryTitle={course.courseName}
                imageId={course.imageId}
                imageURL={course.imageURL}
              />
            </div>
            <div class=" flex flex-col w-2/3" >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${courseName || ""}`}
              </Title>
            </div>
          </div>
          </div>
      </>
    );
  }
}
export default CourseOverView;

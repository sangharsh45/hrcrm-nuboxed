import React, { Component,lazy} from "react";
import CourseOverViewCard from "../CourseCards/CourseOverViewCard";

class CourseDetailsLeft extends Component {
  render() {
    const { course } = this.props;
    return (
      <>
        <div class=" flex flex-col" >
         <CourseOverViewCard course={course} />
         </div>
      </>
    );
  }
}
export default CourseDetailsLeft;

import React, { Component } from "react";
import { Link } from "../../../Components/Common";
class CourseDetailsView extends Component {
  render() {
    console.log("courseId", this.props.courseId);
    return (
      <>
        <Link
          toUrl={`course/${this.props.courseId}`}
          title={`${this.props.courseName}`}
        />
      </>
    );
  }
  
}
export default CourseDetailsView;

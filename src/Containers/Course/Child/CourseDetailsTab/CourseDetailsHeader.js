import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import CourseDetailActionLeft from "./CourseDetailActionLeft";


class CourseDetailsHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<CourseDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default CourseDetailsHeader;

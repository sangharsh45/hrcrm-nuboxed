import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import CourseActionRight from "./CourseActionRight";
class CourseHeader extends Component {
  render() {
    const { handleCourseModal, viewType, setCourseViewType } = this.props;
    return (
      <>
 <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
          <ActionHeader
            // leftComponent={
            //     <EmployeesActionLeft
            //         viewType={viewType}
            //         setCourseViewType={setCourseViewType}
            //         currentData={this.props.currentData}
            //         handleClear={this.props.handleClear}
            //         setCurrentData={this.props.setCurrentData}
            //     />
            // }
            rightComponent={
              <CourseActionRight
                viewType={viewType}
                handleCourseModal={handleCourseModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default CourseHeader;

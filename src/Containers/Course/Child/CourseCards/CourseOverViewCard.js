import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import CourseOverView from "./CourseOverView";



class CourseOverViewCard extends Component {
  render() {
    const { course } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CourseOverView course={course} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CourseOverViewCard;

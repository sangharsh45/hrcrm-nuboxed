import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
function AssessmentDetailsView(props) {
  console.log("assessmentId", props.assessmentId);
    return (
      <>
        <Link
          toUrl={`/assessment/${props.assessmentId}`}
          title={`${props.assessmentName}`}
        />
      </>
    );
 
}
export default AssessmentDetailsView;

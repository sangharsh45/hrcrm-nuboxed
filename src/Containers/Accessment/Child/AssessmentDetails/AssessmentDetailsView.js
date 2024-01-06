import React from "react";
import { Link } from "../../../../Components/Common";
function AssessmentDetailsView(props) {
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

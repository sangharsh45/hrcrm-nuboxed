import React from "react";
import RecruitmentDetailsTab from "./RecruitmentDetailsTab";

class RecruitmentDetailsRight extends React.Component {
  render() {
    console.log(this.props.stageList);
    console.log("Detail9",this.props.candidateId);
    return (
      <div style={{ width: "100%" }}>
        <RecruitmentDetailsTab
          candidate={this.props.candidate}
          stageList={this.props.stageList}
          candidateId={this.props.candidateId}
          profileId={this.props.profileId}
        />
      </div>
    );
  }
}
export default RecruitmentDetailsRight;

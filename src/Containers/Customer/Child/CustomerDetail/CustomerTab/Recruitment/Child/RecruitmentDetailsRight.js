import React from "react";
import RecruitmentDetailsTab from "./RecruitmentDetailsTab";

class RecruitmentDetailsRight extends React.Component {
  render() {
    console.log(this.props.stageList);
    return (
      <div style={{ width: "100%" }}>
        <RecruitmentDetailsTab
          contact={this.props.contact}
          stageList={this.props.stageList}
          profileId={this.props.profileId}
        />
      </div>
    );
  }
}
export default RecruitmentDetailsRight;

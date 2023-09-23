import React, { Component } from "react";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
 import CandidateAvailibityCard from "./RecruitmentCard/CandidateAvailibityCard";

 import CandidateCatagoryCard from "./RecruitmentCard/CandidateCatagoryCard";
 import RecruitmentDocumentCard from "./RecruitmentCard/RecruitmentDocumentCard"

import RecruitmentCandidateCard from "./RecruitmentCard/RecruitmentCandidateCard";
import RecruitmentDetailsRight from "./RecruitmentDetailsRight"
// import TaskOppCard from "./TaskOppCard/TaskOppCard";
// import TaskOppStatsCard from "./TaskOppCard/TaskOppStatsCard";
// import TaskOppAboutCard from "./TaskOppCard/TaskOppAboutCard";

class RecruitmentDetailsLeft extends Component {
  render() {
    const { candidate } = this.props;
    console.log("Detail4",this.props.candidateId)
    return (
      <FlexContainer flexDirection="" style={{ display: "block" }}>
        {/* <RecruitmentCandidateCard candidate={candidate} /> */}
        <RecruitmentDetailsRight  
        candidate={this.props.candidate}
        candidateId={this.props.candidateId}
                      stageList={this.props.stageList}
                      profileId={this.props.profileId}
                      />
  <div style={{display:"flex"}}>  
  <div style={{width: "50%"}}>         
         <CandidateCatagoryCard candidate={candidate} />
         </div>
         <div style={{width: "50%"}}>
         <RecruitmentDocumentCard candidate={candidate} />
         </div>
         </div>
      
      </FlexContainer>
    );
  }
}

export default RecruitmentDetailsLeft;

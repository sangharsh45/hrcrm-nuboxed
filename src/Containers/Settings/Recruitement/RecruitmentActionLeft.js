import React,{lazy} from "react";
const RecruitmentProfileCard = lazy(() => import("./Child/RecruitmentCard/RecruitmentProfileCard"));

function RecruitmentActionLeft(props) {
  console.log(props.rules);
  return (
    <div>
      <div class=" flex flex-col display-block" >
        <RecruitmentProfileCard
          handleRuleClick={props.handleRuleClick}
          rules={props.rules}
          currentRulesOpen={props.currentRulesOpen}
          recruitProAdvance={props.recruitProAdvance}
          handleRecruitProAdvance={props.handleRecruitProAdvance}
        />
      </div>
    </div>
  );
}
export default RecruitmentActionLeft;

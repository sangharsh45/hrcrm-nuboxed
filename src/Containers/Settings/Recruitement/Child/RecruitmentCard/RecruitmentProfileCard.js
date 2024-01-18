import React,{lazy} from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const RecruitmentProfileView = lazy(() => import("./RecruitmentProfileView"));

function RecruitmentProfileCard(props) {
  console.log(props.rules);
  return (
    <div>
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <RecruitmentProfileView
              rules={props.rules}
              handleRuleClick={props.handleRuleClick}
              toggleViewType={toggleViewType}
              currentRulesOpen={props.currentRulesOpen}
              recruitProAdvance={props.recruitProAdvance}
              handleRecruitProAdvance={props.handleRecruitProAdvance}
            />
          ) : null
        }
      </ViewEditCard>
    </div>
  );
}

export default RecruitmentProfileCard;

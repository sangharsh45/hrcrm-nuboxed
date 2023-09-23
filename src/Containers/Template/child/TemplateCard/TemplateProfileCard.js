import React from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import TemplateProfileView from "./TemplateProfileView";

function TemplateProfileCard(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <TemplateProfileView
              rule={props.rule}
              handleRuleClick={props.handleRuleClick}
              toggleViewType={toggleViewType}
              current={props.currentRulesOpen}
            />
          ) : null
        }
      </ViewEditCard>
    </div>
  );
}

export default TemplateProfileCard;

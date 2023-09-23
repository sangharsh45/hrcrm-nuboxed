import React from "react";
import { FlexContainer } from "../../Components/UI/Layout";
import TemplateProfileCard from "./child/TemplateCard/TemplateProfileCard";

function TemplateActionLeft(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
      <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <TemplateProfileCard
          handleRuleClick={props.handleRuleClick}
          rule={props.rule}
          currentRulesOpen={props.currentRulesOpen}
        />
      </FlexContainer>
    </div>
  );
}
export default TemplateActionLeft;

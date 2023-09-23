import React, { lazy, Suspense, useState } from "react";
import { MainWrapper } from "../../Components/UI/Elements";
import { BundleLoader } from "../../Components/Placeholder";
import { FlexContainer } from "../../Components/UI/Layout";
import TemplateActionRight from "./TemplateActionRight";
import TemplateTab from "./child/TemplateTab/Template/TemplateTab";

// const TemplateActionLeft = lazy(() => import("./TemplateActionLeft"));

function Template() {
  const name = [
    {
      rulesName: "Email",
      ruleId: "1",
      component: <TemplateTab current={"Email"} />,
    },
    {
      rulesName: "Notification",
      ruleId: "2",
      component: <TemplateTab current={"Notification"}/>,
    },
  ];
  const [rules, setRules] = useState(name);
  const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const handleRuleClick = (item) => {
    debugger;
    setCurrentRulesOpen(item);
  };
  console.log(currentRulesOpen);
  return (
    <div>
      {false ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
          <FlexContainer>
            <Suspense fallback={"Loading..."}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "0%" }}>
                  {/* <TemplateActionLeft
                    handleRuleClick={handleRuleClick}
                    rule={rules}
                    currentRulesOpen={currentRulesOpen}
                  /> */}
                </div>
                <div style={{ width: "100%" }}>
                  <TemplateActionRight current={currentRulesOpen} />
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
    </div>
  );
}
export default Template;

import React, { Suspense,lazy, useState } from "react";
import { MainWrapper } from "../../Components/UI/Elements";
import { BundleLoader } from "../../Components/Placeholder";
const TemplateActionRight = lazy(() => import("./TemplateActionRight"));
const TemplateTab = lazy(() => import("./child/TemplateTab/Template/TemplateTab"));


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
          <div class=" flex">
            <Suspense fallback={"Loading..."}>
              <div class=" flex flex-no-wrap w-full" >
                <div style={{ width: "0%" }}>
                  {/* <TemplateActionLeft
                    handleRuleClick={handleRuleClick}
                    rule={rules}
                    currentRulesOpen={currentRulesOpen}
                  /> */}
                </div>
                <div class=" w-full" >
                  <TemplateActionRight current={currentRulesOpen} />
                </div>
              </div>
            </Suspense>
          </div>
        )}
    </div>
  );
}
export default Template;

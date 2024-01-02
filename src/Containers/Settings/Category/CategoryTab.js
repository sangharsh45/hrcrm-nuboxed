import React, { Suspense, useState} from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import {  FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import CategoryActivity from "./CategoryActivity";
import Category from "./Category";
import CategoryActionLeft from "./CategoryActionLeft";
import CategoryActionRight from "./CategoryActionRight";
import OthersTab from "./OthersTab";
import CustomerSectorTab from "./CustomerSectorTab";
import InvestorTab from "./InvestorTab/InvestorTab";
import ModuleTab from "./Module/ModuleTab";
const TabPane = StyledTabs.TabPane;

function CategoryTab (props) {

        const name = [
              {
            rulesName: "Module",
            ruleId: "1",
            component:<ModuleTab/>,
          },

          {
            rulesName: "Role",
            ruleId: "2",
            component:<Category/>,
          },
            {
              rulesName: "Activity",
              ruleId: "3",
              component:   <CategoryActivity/>,
            },
            {
              rulesName: "Corporate",
              ruleId: "4",
              component: <OthersTab />,
            },
            {
              rulesName: "Customer",
              ruleId: "5",
              component:<CustomerSectorTab />,
            },
            {
              rulesName: "Investor",
              ruleId: "6",
              component:<InvestorTab />,
            },
            // {
            //   rulesName: "Assessment",
            //   ruleId: "4",
            //   component:<AssessmentTab/>,
            // },

          ];
          const [rules, setRules] = useState(name);
          const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);    
          const handleRuleClick = (item) => {
            setCurrentRulesOpen(item);  
          };
        return (
          <div>
          <div>
            <Suspense fallback={"Loading..."}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div class=" w-[20%]" >
                  <CategoryActionLeft
                    handleRuleClick={handleRuleClick}
                    rules={rules}
                    currentRulesOpen={currentRulesOpen}
                  />
                </div>
                <div class=" w-[80%]" >
                  <CategoryActionRight current={currentRulesOpen} />
                </div>
              </FlexContainer>
            </Suspense>
          </div>
        </div>
      );
    }
    const mapStateToProps = ({ settings, auth }) => ({
      recruitmentDetailsId:
        auth.userDetails && auth.userDetails.recruitmentDetailsId,
        organizationId: auth.userDetails && auth.userDetails.organizationId,
      advanceRecruitInd:
        auth.userDetails &&
        auth.userDetails.metaData &&
        auth.userDetails.metaData.advanceRecruitInd,
    });
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {  
        },
        dispatch
      );
export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab);
   
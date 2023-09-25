import React, { lazy, Suspense, useState, } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import RecruitmentActionRight from "./RecruitmentActionRight";
import {
   getProcessForRecruit,
    dataClear,
} from "../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Template from "../../Template/Template"
import ReportScheduler from "./Child/ReportScheduler/ReportScheduler";
import Access from "./Child/Access/Access";
import General from "./Child/General/General";
 import WorkFlow from "./Child/RecruitmentTab/WorkFlowTab";
import SkillsTab from "../Library/SkillsTab";
import NotificationsTab from "./Child/Notification/NotificationsTab";
import ApprovalTab from "./Child/Approval/ApprovalTab";
import SettingsHolidayTab from "./Child/Holiday/SettingsHolidayTab";
import Rules from "../../Rules/Rules";
import ConfigureTab from "./Child/Configure/ConfigureTab";

const RecruitmentActionLeft = lazy(() => import("./RecruitmentActionLeft"));

function Recruitment(props) {
  const name = [
    {
      rulesName: "Workflow",
      ruleId: "1",
       component: <WorkFlow/>,
    },
    {
      rulesName: "Template",
      ruleId: "4",
      component: <Template />,
    },
    // {
    //   rulesName: "Automation",
    //   ruleId: "2",
    //   component: <RecruitTab />,
    // },
    // {
    //   rulesName: "Search",
    //   ruleId: "3",
    //   component: <SeachTab />,
    // },
    // {
    //   rulesName: "Sourcing",
    //   ruleId: "5",
    //   component: <IndeedForm />,
    // },
    {
      rulesName: "Skills and Certifications",
      ruleId: "6",
      component: <SkillsTab/>,
    },
    {
      rulesName: "Report Scheduler",
      ruleId: "8",
      component: <ReportScheduler />,
    },

    // {
    //   rulesName: "Monetize",
    //   ruleId: "9",
    //   component: <ThirdPartyAccess />,
    // },
   
    {
      rulesName: "Access",
      ruleId: "12",
      component: <Access />,
    },

    // {
    //   rulesName: "Compliance",
    //   ruleId: "13",
    //   component: <ComplianceForm />,
    // },
    // {
    //   rulesName: "Commission",
    //   ruleId: "7",
    //   component: <Commission/>,
    // },
    {
      rulesName: "General",
      ruleId: "14",
      component: <General/>,
    },
    {
      rulesName: "Notification",
      ruleId: "15",
      component: <NotificationsTab />,
    },
    // {
    //   rulesName: "Assessment",
    //   ruleId: "16",
    //   component: <AssessmentTab />,
    // },
    {
      rulesName: "Holidays",
      ruleId: "17",
      component: <SettingsHolidayTab />,
    },

    {
      rulesName: "Approval",
      ruleId: "19",
      component: <ApprovalTab />,
    },
    {
      rulesName: "Rules",
      ruleId: "20",
      component: <Rules />,
    },
 
     ];
  const [rules, setRules] = useState(name);
  const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]);
  const [recruitProAdvance, setRecruitProAdvance] = useState(
  props.advanceRecruitmentInd
  );
  const handleRuleClick = (item) => {
    setCurrentRulesOpen(item);
    props.dataClear();
  };
  // function handleRecruitProAdvance(checked) {
  //   props.enableRecruitmentAdvance(props.recruitmentDetailsId);
  // }
  // useEffect(() => {
  //   setRecruitProAdvance(props.advanceRecruitInd);
  // }, [props.advanceRecruitInd]);
  //gfgfghvfghvf

  return (
    <div>
      <FlexContainer>
        <Suspense fallback={"Loading..."}>
          <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
            <div style={{ width: "24%" }}>
              <RecruitmentActionLeft
                handleRuleClick={handleRuleClick}
                rules={rules}
                currentRulesOpen={currentRulesOpen}
                // recruitProAdvance={recruitProAdvance}
                // handleRecruitProAdvance={handleRecruitProAdvance}
              />
            </div>
            <div style={{ width: "74%" }}>
              <RecruitmentActionRight current={currentRulesOpen} />
            </div>
          </FlexContainer>
        </Suspense>
      </FlexContainer>
      {/* )} */}
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
       getProcessForRecruit,
         dataClear,
        //  enableRecruitmentAdvance
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recruitment);

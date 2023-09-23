import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import RecruitmentActionRight from "./RecruitmentActionRight";
import {
   getProcessForRecruit,
    dataClear,
} from "../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Template from "../../Template/Template"
import RecruitTab from "../../Rules/Child/RulesTab/RecruitPro/RecruitTab";
import SeachTab from "./Child/RecruitmentTab/SearchTab";
import IndeedForm from "./Child/Indeed/IndeedTab";
import Library from "../Library/Library";
import Commission from "./Child/Commission/Commission";
import ReportScheduler from "./Child/ReportScheduler/ReportScheduler";
import ThirdPartyAccess from "./Child/ThirdPartyAccess/ThirdPartyAccess";
import Access from "./Child/Access/Access";
import ComplianceForm from "./Child/Compliance/ComplianceForm";
import General from "./Child/General/General";
import NotificationForm from "../../Template/child/TemplateTab/Template/NotificationForm";
 import WorkFlow from "./Child/RecruitmentTab/WorkFlowTab";
import AssessmentTab from "./Child/Assessment/AssessmentTab";
import Certification from "./Child/Certification/Certification";
import SkillsTab from "../Library/SkillsTab";
import Notifications from "./Child/General/Notifications";
import NotificationsTab from "./Child/Notification/NotificationsTab";
import HolidayTab from "../../Holiday/HolidayTab";
import ConfigureTab from "./Child/Configure/ConfigureTab";
import ApprovalTab from "./Child/Approval/ApprovalTab";
import SettingsHolidayTab from "./Child/Holiday/SettingsHolidayTab";

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
    {
      rulesName: "Automation",
      ruleId: "2",
      component: <RecruitTab />,
    },
    {
      rulesName: "Search",
      ruleId: "3",
      component: <SeachTab />,
    },
    {
      rulesName: "Sourcing",
      ruleId: "5",
      component: <IndeedForm />,
    },
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

    {
      rulesName: "Monetize",
      ruleId: "9",
      component: <ThirdPartyAccess />,
    },
   
    {
      rulesName: "Access",
      ruleId: "12",
      component: <Access />,
    },

    {
      rulesName: "Compliance",
      ruleId: "13",
      component: <ComplianceForm />,
    },
    {
      rulesName: "Commission",
      ruleId: "7",
      component: <Commission/>,
    },
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
    {
      rulesName: "Assessment",
      ruleId: "16",
      component: <AssessmentTab />,
    },
    {
      rulesName: "Holidays",
      ruleId: "17",
      component: <SettingsHolidayTab />,
    },
    {
      rulesName: "Task",
      ruleId: "18",
      component: <ConfigureTab />,
    },
    {
      rulesName: "Approval",
      ruleId: "19",
      component: <ApprovalTab />,
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

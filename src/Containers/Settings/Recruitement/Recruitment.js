import React, { lazy, Suspense, useState, } from "react";
import RecruitmentActionRight from "./RecruitmentActionRight";
import {
   getProcessForRecruit,
    dataClear,
} from "../SettingsAction";
import Matrix from "../Recruitement/Child/RecruitmentTab/Matrix"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Template from "../../Template/Template"
import Access from "./Child/Access/Access";
import General from "./Child/General/General";
import Form from "./Child/RecruitmentTab/FormTab"
 import WorkFlow from "./Child/RecruitmentTab/WorkFlowTab";
import SkillsTab from "../Library/SkillsTab";
import ApprovalTab from "./Child/Approval/ApprovalTab";
import SettingsHolidayTab from "./Child/Holiday/SettingsHolidayTab";
import LeadsTab from "../../Rules/Child/RulesTab/LeadsTab";
import LeadsConfigTab from "../LeadsConfig/LeadsConfigTab";
import DistributionTab from "./Child/DistributionTab/DistributionTab";
import FinanceTab from "./Child/FinanceTab/FinanceTab";

const RecruitmentActionLeft = lazy(() => import("./RecruitmentActionLeft"));

function Recruitment(props) {
  const name = [

    {
      rulesName: "Access",
      ruleId: "12",
      component: <Access />,
    },
    {
      rulesName: "Approval",
      ruleId: "19",
      component: <ApprovalTab />,
    },
    {
      rulesName: "Automation",
      ruleId: "25",
      component: <DistributionTab />,
    },
    {
      rulesName: "Form",
      ruleId: "24",
      component: <Form/>,
    },
    
    {
      rulesName: "General",
      ruleId: "14",
      component: <General/>,
    },
    {
      rulesName: "Holidays",
      ruleId: "17",
      component: <SettingsHolidayTab />,
    },
    // {
    //   rulesName: "Leads",
    //   ruleId: "21",
    //   component: <LeadsConfigTab/>,
    // },
    // {
    //   rulesName: "Notification",
    //   ruleId: "15",
    //   component: <NotificationsTab />,
    // },
    
    // {
    //   rulesName: "Report Scheduler",
    //   ruleId: "8",
    //   component: <ReportScheduler />,
    // },
    {
      rulesName: "Rules",
      ruleId: "20",
      component: <LeadsTab />,
    },
    {
      rulesName: "Skills and Certifications",
      ruleId: "6",
      component: <SkillsTab/>,
    },
    {
      rulesName: "Template",
      ruleId: "4",
      component: <Template />,
    },
    {
      rulesName: "Workflow",
      ruleId: "1",
       component: <WorkFlow/>,
    },
    {
      rulesName: "Finance",
      ruleId: "16",
      component: <FinanceTab/>,
    },
    {
      rulesName: "Matrix",
      ruleId: "28",
      component: <Matrix/>,
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
    
    

    // {
    //   rulesName: "Monetize",
    //   ruleId: "9",
    //   component: <ThirdPartyAccess />,
    // },
   
    

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
    
    
    // {
    //   rulesName: "Assessment",
    //   ruleId: "16",
    //   component: <AssessmentTab />,
    // },
    

    
   
    
 
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
      <div class=" flex ">
        <Suspense fallback={"Loading..."}>
        <div class=" flex flex-no-wrap w-full ">
            <div class=" w-[24%]">
              <RecruitmentActionLeft
                handleRuleClick={handleRuleClick}
                rules={rules}
                currentRulesOpen={currentRulesOpen}
                // recruitProAdvance={recruitProAdvance}
                // handleRecruitProAdvance={handleRecruitProAdvance}
              />
            </div>
            <div class=" w-[74%]" >
              <RecruitmentActionRight current={currentRulesOpen} />
            </div>
          </div>
        </Suspense>
      </div>
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

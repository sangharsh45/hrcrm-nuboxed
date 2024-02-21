import React, { useEffect,useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Button,Steps,Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getProcessForOnboarding ,getProcessStagesForOnboarding} from '../../../Settings/SettingsAction';
import { Field } from 'formik';
import {addOnboardingEmployee,getUserStageList} from "../../../Employees/EmployeeAction"
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../../../../Components/Forms/Formik/SelectComponent';

const OnBoardingEmployeeForm = (props) => {
  const [selectedWork, setSelectedWork] = useState("");
  const [stageList, setStageList] = useState();
  useEffect(() => {
    props.getProcessForOnboarding(props.orgId);
    // props.getUserStageList(props.employeeName.employeeId);
  }, []);

  const { onboardingProcess, ratingValue } = props;
  const handleWorkflowChange = (event) => {
    const selectedWork = event.target.value;
    setSelectedWork(selectedWork);
    //  setSelectedUser("");
     props.getProcessStagesForOnboarding(selectedWork) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  console.log("cgdf",props.currentEmployeeId)
  return (
    <>
      <div className="mt-4 flex">
      <div class=" w-[35%]" >
                                                    <label class=" text-[#444] font-bold text-[0.75rem]" >Workflow</label>
                                                    <select className="customize-select" onChange={handleWorkflowChange}>
            <option value="">Select Workflow</option>
            {onboardingProcess.map((item, index) => (
              <option key={index} value={item.unboardingWorkflowDetailsId}>
                {item.workflowName}
              </option>
            ))}
          </select>
        </div>
        {selectedWork && (
          <>                                           
          <div class="bg-white">
          <Steps direction="vertical" current={1}>
                {props.onboardingProcessStages.map((user, index) => (
                  <Steps.Item key={index} title={user.userName} status={user.status}>
                    <div>
                      <b>{user.stageName}</b>
                    </div>
                  </Steps.Item>
                ))}
              </Steps>
        {/* <StartRepairReasonModal
            particularRowData={props.particularRowData}
            handleRepairReason={props.handleRepairReason}
            showRepairReasonModal={props.showRepairReasonModal} />
        <ShowPaymentHistoryModal
            particularRowData={props.particularRowData}
            handlePaymentHistory={props.handlePaymentHistory}
            showPaymentHistoryModal={props.showPaymentHistoryModal}
        /> */}

    </div>              
</> 
        )} 
       
          <Button>Submit</Button>
      
       
     
      </div>
      <div class=" flex justify-end">
        <Tooltip title="Release Registration Email to the user">
          <Button
           onClick={() => {
            props.addOnboardingEmployee(props.currentEmployeeId.employeeId);
           
          }}
          >Onboarding Completed</Button>
             </Tooltip>
        </div>
    </>
  );
};

const mapStateToProps = ({ settings, employee,auth }) => ({
  onboardingProcessStages:settings.onboardingProcessStages,
  orgId: auth.userDetails && auth.userDetails.organizationId,
  onboardingProcess: settings.onboardingProcess,
  userStageList:employee.userStageList,
  setEditingEmployee:employee.setEditingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForOnboarding,
      getProcessStagesForOnboarding,
      addOnboardingEmployee,
      getUserStageList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingEmployeeForm);

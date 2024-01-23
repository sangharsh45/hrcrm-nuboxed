import React, { useEffect,useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Button,Steps } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getProcessForOnboarding } from '../../../Settings/SettingsAction';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../../../../Components/Forms/Formik/SelectComponent';

const OnBoardingEmployeeForm = (props) => {
  const [selectedWork, setSelectedWork] = useState("");
  useEffect(() => {
    props.getProcessForOnboarding(props.orgId);
  }, []);

  const { onboardingProcess, ratingValue } = props;
  const handleWorkflowChange = (event) => {
    const selectedWork = event.target.value;
    setSelectedWork(selectedWork);
    // setSelectedUser("");
    // props.getProcessForOnboarding(selectedWork) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  return (
    <>
      <div className="mt-4">
      <div class=" w-[35%]" >
                                                    <label class=" text-[#444] font-bold text-[0.75rem]" >Workflow</label>
                      <select  className="customize-select"
                       
                      onChange={handleWorkflowChange}>
          <option value="">Select Workflow</option>
          {onboardingProcess.map((item, index) => (
            <option 
           
            key={index} value={item.unboardingWorkflowDetailsId}>
              {item.workflowName}
            </option>
          ))}
        </select>
        </div>
        {selectedWork && (
          <>                                           
          <div class="bg-white">
        <Steps
            direction="vertical"
            current={1}
            items={[
                {
                    title:<FormattedMessage
                        id="app.ordercreated"
                        defaultMessage="Order Created"
                       />,
                    status: <FormattedMessage
                    id="app.progress"
                    defaultMessage="progress"
                   />,
                 
                },
                {
                    title: 'Advance Payment',
                  
                   
                },
                {
                    title: 'Order Pick Up',
                    status: 'progress',
                  
                },

                {
                    title: 'Warehouse',
                    status: 'progress',
                 
                },
                {
                    title: 'QC',
                 
                },

                {
                    title: 'Order Commercial Confirmation',
                  
                },
                {
                    title: 'Repair',
                    // after complete show repair completed on date and user
                  
                },

                {
                    title: 'Packing',
                    // after packed button on enabled level
                    status: 'progress',
                    // description: <>
                    //     {props.particularRowData.dispatchInspectionInd === 3 &&
                    //         <b>Packed By {props.particularRowData.packedBy} On {moment(props.particularRowData.packedDate).format("DD-MM-YYYY")}</b>
                    //     }
                    // </>
                },
                {
                    title: 'Schedule PickUp',
                    // after customer pickup order (after delivery address)
                    // status: <>
                    //     {props.particularRowData.pickupInd === false ? 'wait' : 'finish'}</>,
                    // description: <>
                    //     {props.particularRowData.pickupInd && <b>Scheduled for {props.particularRowData.unloadingAddresses && props.particularRowData.unloadingAddresses[0].city || ""} On {moment(props.particularRowData.unloadingDate).format("DD-MM-YYYY")} by {props.particularRowData.unloadingUser}</b>}
                    // </>
                },
                {
                    title: 'Order Dispatch',
                    status: 'progress',

                },
                {
                    title: 'Customer Feedback',
                    status: 'progress',

                },
            ]}
        />
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
        <div class=" flex justify-end">
          <Button>Submit</Button>
        </div>
        {/* <Timeline>
          {mileageStatus &&
            mileageStatus.map((status, i) => (
              <Timeline.Item key={i}>
                {status.approvedStatus === 'Approved' ? (
                  ` ${moment(status.createdOn).format('ll')} Approved By ${status.employeeName} on ${moment(status.approvedDate).format('ll')}`
                ) : status.approvedStatus === 'Pending' ? (
                  `Pending With ${status.employeeName}.`
                ) : null}
              </Timeline.Item>
            ))}
        
        </Timeline> */}
      </div>
    </>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails && auth.userDetails.organizationId,
  onboardingProcess: settings.onboardingProcess,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForOnboarding,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingEmployeeForm);

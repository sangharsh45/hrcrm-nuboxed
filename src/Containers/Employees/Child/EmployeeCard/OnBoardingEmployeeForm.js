import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getProcessForOnboarding } from '../../../Settings/SettingsAction';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../../../../Components/Forms/Formik/SelectComponent';

const OnBoardingEmployeeForm = (props) => {
  useEffect(() => {
     props.getProcessForOnboarding(props.orgId);
  }, []);

  const { onboardingProcess, ratingValue } = props;
  const sortedWorkflow =onboardingProcess.sort((a, b) => {
    const nameA = a.workflowName.toLowerCase();
    const nameB = b.workflowName.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const workflowOption = sortedWorkflow.map((item) => {
    return {
      label: item.workflowName || "",
      value: item.unboardingWorkflowDetailsId,
    };
  });
  return (
    <>
      <div className="mt-4">
      <Field             
                  placeholder="Workflow"        
                            name="unboardingWorkflowDetailsId"
                            label={
                              <FormattedMessage
                                id="app.workflow"
                                defaultMessage="Workflow"
                              />
                            }
                            isColumn
                            component={SelectComponent}
                            // value={values.sectorId}
                            options={
                              Array.isArray(workflowOption) ? workflowOption : []
                            }
                          />
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

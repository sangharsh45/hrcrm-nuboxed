import React from 'react';
import { withRouter } from "react-router-dom";
import { FormattedMessage, IntlProvider } from "react-intl";
import { FlexContainer } from "../../../../../Components/UI/Layout/";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";
import StatusToggleID from './AssessmentCards/StatusToggleID';

function AssessmentDetailsActionLeft(props) {
  const {
    assessmentByAssessmentId: { assessmentName, publishInd, assessmentId },
    toggleViewType,
    assessmentByAssessmentId,
  } = props;
  return (
   <>
    
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between" }}>
          <div style={{margin:"auto"}}>
        <RollbackOutlined
          style={{ marginRight: "0.3rem" }}
          iconType="rollback"
          // tooltipTitle="Back"
          tooltipTitle={
            <FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />
          }
          // style={{ color: "#1890ff" }}
        onClick={() => props.history.goBack()}
        />
        </div>
        <div style={{margin:"auto"}}>
        <h7>{`${props.assessmentByAssessmentId.assessmentName}`}</h7>
        </div>
        <div style={{marginLeft:"1.25em"}}>
        <StatusToggleID
        assessmentByAssessmentId={assessmentByAssessmentId}
        assessmentId={props.assessmentId}
        publishInd={props.publishInd}
        />
        </div>
        </div>
     
   </>
  )
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssessmentDetailsActionLeft)
);

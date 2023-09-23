import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Switch, Button, Popconfirm } from "antd";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { StyledLabel, Spacer } from "../../../../../Components/UI/Elements";
import {
  addingAssessmentAccess,
  getAssessmentAccess,
} from "../../../SettingsAction";
import moment from "moment";

function AssessmentTab(props) {
  useEffect(() => {
    props.getAssessmentAccess(props.orgId);
  }, []);
  const { assessmentInd } = props.assessmentAccess;
  console.log(assessmentInd);
  const [toggle, setToggle] = useState(assessmentInd);
  function handleAssessmentClick(checked) {
    console.log(assessmentInd);
    if (assessmentInd) {
      //disable url
      props.addingAssessmentAccess({
        orgId: props.orgId,
        assessmentInd: assessmentInd ? false : true,
      });
      setToggle(assessmentInd ? false : true);
    } else {
      props.addingAssessmentAccess(
        {
          orgId: props.orgId,
          assessmentInd: assessmentInd ? false : true,
        },
        props.orgId
      );
      setToggle(assessmentInd ? false : true);
    }
  }
  function handleCancel() {
    if (assessmentInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
      <div>
        {/* <StyledLabel> 
           Click To Share                   
      </StyledLabel> */}
        {/* <PermissionForm /> */}
      </div>

      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Enable Assessment </p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
            onConfirm={handleAssessmentClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checked={toggle || assessmentInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer>
      <h4>
        Updated on {moment(props.assessmentAccess.lastUpdatedOn).format("ll")}{" "}
        by {props.assessmentAccess.name}
      </h4>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  assessmentAccess: settings.assessmentAccess,
  fetchingAssessmentAccess: settings.fetchingAssessmentAccess,
  fetchingAssessmentAccessError: settings.fetchingAssessmentAccessError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingAssessmentAccess,
      getAssessmentAccess,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentTab);

import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { workflowDocumentToggle } from "../../../Documents/DocumentsAction";

function WorkflowDocumentToggle(props) {
  const [toggle, setToggle] = React.useState(props.mandatoryInd);

  function handleToggleCollection(item) {
    if (props.mandatoryInd) {
      props.workflowDocumentToggle({
        // documentTypeName: props.documentTypeName,
        documentTypeId: props.documentTypeId,
         processId:props.processId,
        userId:props.userId,
        orgId:props.orgId,
        // editInd:false,
        mandatoryInd: props.mandatoryInd ? false : true,
      });
    } else {
      props.workflowDocumentToggle({
        // documentTypeName: props.documentTypeName,
        documentTypeId: props.documentTypeId,
         processId:props.processId,
        userId:props.userId,
        orgId:props.orgId,
        // editInd:false,
        mandatoryInd: props.mandatoryInd ? false : true,
      });
    }
  }

  function handleCancel() {
    if (props.mandatoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.mandatoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Mandatory"
            unCheckedChildren="Not Mandatory"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        workflowDocumentToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkflowDocumentToggle);

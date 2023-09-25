import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkCrmToggle } from "../Department/DepartmentAction";

function CRMStatusToggle(props) {
  const [toggle, setToggle] = React.useState(props.crmInd);
console.log("abc",props.crmInd);
  function handleToggleCollection(item) {
    if (props.crmInd) {
      props.linkCrmToggle({
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        editInd:false,
        crmInd: props.crmInd ? false : true,
      },
      props.departmentId,
      );

    } else {
      props.linkCrmToggle({
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        editInd:false,
        crmInd: props.crmInd ? false : true,
      },
      props.departmentId,
      );
    }
  }

  function handleCancel() {
    if (props.crmInd) {
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
            checked={props.crmInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  // userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkCrmToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CRMStatusToggle);

import React, { Component } from "react";
import { Switch, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  // getAssignedToList,
  suspendEmployee,
  suspendStatus,
} from "../../EmployeeAction";

function SuspendEmployee(props) {
  const [assignedIndicator, setAssignedIndicator] = React.useState(false);
  const [toggle, setToggle] = React.useState(props.suspendInd);

  function handleToggleClick() {
    setAssignedIndicator(!assignedIndicator);
    if (props.suspendInd) {
      props.suspendEmployee(
        {
          employeeId: props.employeeId,
          userId: props.userId,
          suspendInd: props.suspendInd ? false : true,
        },
        // handleCallback,
        props.employeeId,
        props.suspendInd? false : true ,
   
      
      );
    } else {
      props.suspendEmployee(
        {
          employeeId: props.employeeId,
          userId: props.userId,
          suspendInd: props.suspendInd ? false : true,
        },
        // handleCallback,
        props.employeeId,
        props.suspendInd? false : true ,
      
      );
    }
  }

  // function handleCallback(a, b, c) {
  //   // debugger;
  //   if (a === "success") {
  //     // debugger;
  //     if (c === false) {
  //       // debugger;
  //       message.info(b);
  //       setAssignedIndicator(false);
  //       props.getAssignedToList(props.orgId);
  //     } else {
  //       // debugger;
  //       message.success("User login disabled sucessfully");
  //       props.getAssignedToList(props.orgId);
  //     }
  //   } else {
  //     // debugger;
  //     message.error("something went wrong");
  //   }
  // }
  function handleCancel() {
    if (props.suspendInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <>
      <div>
        <Popconfirm
          title="Suspend Access to App?"
          onConfirm={() => handleToggleClick()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={props.suspendInd || toggle}
            isLoading={true}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, employee }) => ({
  suspendedEmployees: employee.suspendedEmployees,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      suspendEmployee,
      // getAssignedToList,
      suspendStatus,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SuspendEmployee);

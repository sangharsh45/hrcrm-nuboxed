import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmployeelist, employeeStatus } from "../../EmployeeAction";

function EmployeeType(props) {
  const [toggle, setToggle] = React.useState(props.type);

  function handleToggleCollection(item) {
    if (props.type) {
      props.employeeStatus(
        {
          employeeId: props.employeeId,
          userId: props.userId,
          type: props.type ? false : true,
        },
        props.employeeId
      );
    } else {
      props.employeeStatus(
        {
          employeeId: props.employeeId,
          userId: props.userId,
          type: props.type ? false : true,
        },
        props.employeeId
      );
    }
  }

  function handleCancel() {
    if (props.type) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      <div>
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            className="toggle-clr"
            checked={props.type || toggle}
            checkedChildren="External"
            unCheckedChildren="Internal"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, employee }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      employeeStatus,
      getEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeType);

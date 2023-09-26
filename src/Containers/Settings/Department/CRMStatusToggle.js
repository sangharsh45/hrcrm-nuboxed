import React, { useEffect,Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkCrmToggle,getDepartments } from "../Department/DepartmentAction";

function CRMStatusToggle(props) {
  // useEffect(() => {
  //   props.getDepartments();
  //   // props.getRequirementsDuration(props.orgId);
  // }, []);
  const { crmInd } = props.departments;
  const [crm, setCrm] = React.useState(crmInd);
// console.log("abc",props.crmInd);
  function handleCrmToggleCollection(item) {
    if (crmInd) {
      props.linkCrmToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        crmInd: crmInd ? false : true,
      },
      props.departmentId,
      );
      setCrm(crmInd ? false : true);

    } else {
      props.linkCrmToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        crmInd: crmInd ? false : true,
      },
      props.departmentId,
      );
      setCrm(crmInd ? false : true);
    }
  }

  function handleCrmCancel() {
    if (crmInd) {
      setCrm(true);
    } else {
      setCrm(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleCrmToggleCollection()}
          onCancel={handleCrmCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.crmInd || crm}
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

const mapStateToProps = ({ auth, departments }) => ({
  departments: departments.departments,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkCrmToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CRMStatusToggle);

import React, { useEffect,Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkImToggle,getDepartments } from "../Department/DepartmentAction";

function IMStatusToggle(props) {
  // useEffect(() => {
  //   props.getDepartments();
  //   // props.getRequirementsDuration(props.orgId);
  // }, []);
  // const { crmInd } = props.departments;
  const [crm, setCrm] = React.useState(props.imInd);
console.log("crrm",props.imInd);
  function handleImToggleCollection(item) {
    if (props.imInd) {
      props.linkImToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        imInd: props.imInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkImToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        imInd: props.imInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);
    }
  }

  function handleImCancel() {
    if (props.imInd) {
      setCrm(true);
    } else {
      setCrm(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleImToggleCollection()}
          onCancel={handleImCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.imInd || crm}
            // disabled={props.status}
            isLoading={true}
            style={{width: "4rem"}}
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
        linkImToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IMStatusToggle);

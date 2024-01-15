import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkCrmToggle,getDepartments } from "../Department/DepartmentAction";

function CRMStatusToggle(props) {

  const [crm, setCrm] = React.useState(props.crmInd);
console.log("crrm",props.crmInd);
  function handleCrmToggleCollection(item) {
    if (props.crmInd) {
      props.linkCrmToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        crmInd: props.crmInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkCrmToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        crmInd: props.crmInd ? false : true,
      },
      props.departmentId,
      );
      
    }
  }

  function handleCrmCancel() {
    if (props.crmInd) {
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
            style={{
              width: "7%",
              backgroundColor: props.crmInd || crm ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
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

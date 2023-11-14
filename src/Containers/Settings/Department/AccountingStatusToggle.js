import React, { useEffect,Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkAccountingToggle,getDepartments } from "../Department/DepartmentAction";

function AccountingStatusToggle(props) {

  const [account, setAccount] = React.useState(props.accountInd);
console.log("crrm",props.accountInd);
  function handleAccountToggleCollection(item) {
    if (props.accountInd) {
      props.linkAccountingToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        accountInd: props.accountInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkAccountingToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        accountInd: props.accountInd ? false : true,
      },
      props.departmentId,
      );
    
    }
  }

  function handleAccountCancel() {
    if (props.accountInd) {
      setAccount(true);
    } else {
      setAccount(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleAccountToggleCollection()}
          onCancel={handleAccountCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.accountInd || account}
           
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
      linkAccountingToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountingStatusToggle);

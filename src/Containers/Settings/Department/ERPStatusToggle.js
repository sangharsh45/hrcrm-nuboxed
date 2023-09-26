import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkErpToggle } from "../Department/DepartmentAction";

function ERPStatusToggle(props) {
  const [erp, setErp] = React.useState(props.erpInd);
console.log("errp",props.erpInd);
  function handleErpToggleCollection(item) {
    if (props.erpInd) {
      props.linkErpToggle({
        ...props.notifications,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        erpInd: props.erpInd ? false : true,
      },
      props.departmentId,
      );

    } else {
      props.linkErpToggle({
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        erpInd: props.erpInd ? false : true,
      },
      props.departmentId,
      );
    }
  }

  function handleErpCancel() {
    if (props.erpInd) {
      setErp(true);
    } else {
      setErp(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleErpToggleCollection()}
          onCancel={handleErpCancel}
          okText="Yes"
          cancelText="No"
        >
       
          <Switch
            className="toggle-clr"
            checked={props.erpInd || erp}
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
        linkErpToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ERPStatusToggle);

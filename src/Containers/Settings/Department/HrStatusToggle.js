import React, { } from "react";
import { Switch, Popconfirm,  } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkHrToggle,getDepartments } from "../Department/DepartmentAction";

function HrStatusToggle(props) {
  // useEffect(() => {
  //   props.getDepartments();
  //   // props.getRequirementsDuration(props.orgId);
  // }, []);
  // const { crmInd } = props.departments;
  const [hr, setHr] = React.useState(props.hrInd);
console.log("crrm",props.hrInd);
  function handleHrToggleCollection(item) {
    if (props.hrInd) {
      props.linkHrToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        hrInd: props.hrInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkHrToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        hrInd: props.hrInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);
    }
  }

  function handleHrCancel() {
    if (props.hrInd) {
        setHr(true);
    } else {
        setHr(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleHrToggleCollection()}
          onCancel={handleHrCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.hrInd || hr}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "7%",
              backgroundColor: props.hrInd || hr ? "rgb(119, 221, 119)" : "#E6E6E6",
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
        linkHrToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HrStatusToggle);

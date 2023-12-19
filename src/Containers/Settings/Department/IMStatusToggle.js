import React, {  } from "react";
import { Switch, Popconfirm,  } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkImToggle,getDepartments } from "../Department/DepartmentAction";

function IMStatusToggle(props) {
  // useEffect(() => {
  //   props.getDepartments();
  //   // props.getRequirementsDuration(props.orgId);
  // }, []);
  // const { crmInd } = props.departments;
  const [im, setIm] = React.useState(props.imInd);
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
      setIm(true);
    } else {
      setIm(false);
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
            checked={props.imInd || im}
            // disabled={props.status}
            isLoading={true}
            style={{width: "7%"}}
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

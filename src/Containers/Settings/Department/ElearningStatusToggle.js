import React, {  } from "react";
import { Switch,  Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkElearningToggle,getDepartments } from "../Department/DepartmentAction";

function ElearningStatusToggle(props) {

  const [learning, setLearning] = React.useState(props.eLearningInd);
console.log("crrm",props.eLearningInd);
  function handleElearningToggleCollection(item) {
    if (props.eLearningInd) {
      props.linkElearningToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        eLearningInd: props.eLearningInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkElearningToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        eLearningInd: props.eLearningInd ? false : true,
      },
      props.departmentId,
      );
    
    }
  }

  function handleElearningCancel() {
    if (props.eLearningInd) {
        setLearning(true);
    } else {
        setLearning(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleElearningToggleCollection()}
          onCancel={handleElearningCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.eLearningInd || learning}
           
            isLoading={true}
            style={{
              width: "7%",
              backgroundColor: props.eLearningInd || learning ? "rgb(119, 221, 119)" : "#E6E6E6",
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
        linkElearningToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElearningStatusToggle);

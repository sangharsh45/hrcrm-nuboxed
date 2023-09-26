import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkTaskWorkflowToggle } from "../Task/TaskAction";

function TaskConnetToggle(props) {
  const[data,setData]=useState(props.country)
  // useEffect(()=>{
  //   setData(props.country)
  // },[props.country])
  const [toggle, setToggle] = React.useState(props.mandatoryInd);
  console.log(props.mandatoryInd)

  function handleToggleCollection(item) {
    if (props.mandatoryInd) {
      props.linkTaskWorkflowToggle({
        country_id: props.country_id,
        mandatoryInd: props.mandatoryInd ? false : true,
         
      });
      setToggle( props.mandatoryInd ? false : true);
 
    } else {
      props.linkTaskWorkflowToggle({
        country_id: props.country_id,
        mandatoryInd: props.mandatoryInd ? false : true,
      });
      setToggle( props.mandatoryInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.mandatoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.mandatoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Connect with workflow"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, tasks }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  tasks: tasks.tasks,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         linkTaskWorkflowToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskConnetToggle);











import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  message } from "antd";
import {
  getDashbrdOpenTasks,
  handleTaskNameDrawer
} from "../Dashboard/DashboardAction";
import { BundleLoader } from "../../Components/Placeholder";
const TaskNameDrawer=lazy(()=>import("./TaskNameDrawer"));

class TaskOpens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularTaskName:{}
    };
  }
 
  
  componentDidMount() {
    this.props.getDashbrdOpenTasks(this.props.userId);
  }
  handleParticularTaskName=(taskNme)=>{
    this.setState({particularTaskName:taskNme})
  }

  render() {
    if (this.props.fetchingDashboardoPENTasks) {
      return <BundleLoader/>
    }
    return (
      <>
          <div className="grid grid-cols-5 gap-4 p-4">
  {/* {this.props.dashbOpenTasks.length &&
    this.props.dashbOpenTasks.map((item) => { */}
      {/* return ( */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex" >0</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{
            // this.handleParticularTaskName(item);
            this.props.handleTaskNameDrawer(true)}}>0</div>
        </div>
      {/* ); */}
    {/* })} */}
</div>
        <TaskNameDrawer 
        particularTaskName={this.state.particularTaskName}
        taskNameDrwr={this.props.taskNameDrwr}
        handleTaskNameDrawer={this.props.handleTaskNameDrawer}/>
      </>
    );
  }
}

const mapStateToProps = ({ tasks ,dashboard,auth}) => ({
  dashbOpenTasks: dashboard.dashbOpenTasks,
  userId:auth.userDetails.userId,
  taskNameDrwr:dashboard.taskNameDrwr,
  fetchingDashboardoPENTasks:dashboard.fetchingDashboardoPENTasks
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashbrdOpenTasks,
  handleTaskNameDrawer    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOpens);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew

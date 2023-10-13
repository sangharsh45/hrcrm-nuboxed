import React,{useEffect} from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {getTakskdashboardGantt} from "../DashboardAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from '../../../Components/Placeholder';

const TaskGanttChart = (props) => {


  useEffect(()=>{
 
    props.getTakskdashboardGantt(props.userId,);
},[props.userId])
useEffect(()=>{
  
},[props.tasksdashboardGantt])
  // const data = [
  //   {
  //     taskId: "TIF86786106513252023",
  //     taskType: "Whatsapp",
  //     taskName: "whats",
  //     startDate: "2023-09-26T20:00:00Z",
  //     endDate: "2023-09-26T20:00:00Z",
  //   },
    
  // ];

  
  const tasks = props.tasksdashboardGantt.map(item => ({
    id: item.taskId,
    name: item.taskName,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  if (props.fetchingTaskDashboardGantt) {
    return <BundleLoader />;
  }

  return (
    <div>
      {/* <h2>Gantt Chart</h2> */}
      {props.tasksdashboardGantt.length?
      <Gantt tasks={tasks} />:null}
    </div>
  );
};



const mapStateToProps = ({ task,auth,dashboard }) => ({
  // leavesGantt:dashboard.leavesGantt,
   userId: auth.userDetails.userId,
   tasksdashboardGantt:dashboard.tasksdashboardGantt,
   fetchingTaskDashboardGantt:dashboard.fetchingTaskDashboardGantt,
  //  fetchingLeavesGantt:dashboard.fetchingLeavesGantt,
  // viewType: task.viewType,
  // grantTask:task.grantTask,
  // fetchingGrantTask:task.fetchingGrantTask
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTakskdashboardGantt
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskGanttChart);
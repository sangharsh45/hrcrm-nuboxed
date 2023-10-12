import React,{useEffect,useState} from 'react';
import { Gantt,ViewMode } from 'gantt-task-react';
import { ViewSwitcher } from "../../../Components/ViewSwitcher";
import "gantt-task-react/dist/index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import {getLeavesGantt} from "../DashboardAction"
import moment from "moment";
import { BundleLoader } from '../../../Components/Placeholder';

function LeavesGanttChart(props){

    // const startDate = moment().startOf("month"); 
    // const endDate = moment();
    // var today = new Date(),
    // date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
  
    //   const [dateD,setdateD]=useState(date);
      const [startDatestart,setstartDate]=useState("2023-09-01");
      const [endDateend,setendDate]=useState("2023-10-12");
      const [view, setView] = React.useState(ViewMode.Day);
      const [isChecked, setIsChecked] = React.useState(true);
    useEffect(()=>{
        const startDate = `${startDatestart}T20:00:00Z`
    const endDate = `${endDateend}T20:00:00Z`
        props.getLeavesGantt(props.orgId,endDate,startDate);
    },[props.orgId])
    // useEffect(()=>{
  
    // },[props.leavesGantt])
   
    let columnWidth = 30;
    if (view === ViewMode.Month) {
      columnWidth = 300;
    } else if (view === ViewMode.Week) {
      columnWidth = 250;
    }


  
 
 
    const data1 = props.leavesGantt.map((item) => item.leaveList);
//   console.log(data1)

//   const tasks = data1.map(item => ({
//     id: item.leaveId,
//     name: item.coverDetails,
//     start: new Date(item.startDate),
//     end: new Date(item.endDate),
//   }));
const tasks = data1.map(item => {
    const startDate = moment(item.startDate, "YYYY-MM-DDTHH:mm:ss").toDate();
    const endDate = moment(item.endDate, "YYYY-MM-DDTHH:mm:ss").toDate();
  
    return {
      id: item.leaveId,
      name: item.coverDetails,
      start: startDate,
      end: endDate,
    };
  });
  if (props.fetchingLeavesGantt) {
    return <BundleLoader />;
  }

  return (
    <div>
      {/* <h2>Gantt Chart</h2>
      <Gantt tasks={tasks} /> */}
       <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />

      {props.leavesGantt.length?
      <Gantt
        tasks={tasks}
        viewMode={view}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        barBackgroundColor="blue"
        rowHeight={40}
        fontSize={12}
      />
      :null}
    </div>
  );
};


const mapStateToProps = ({ task,auth,dashboard }) => ({
    leavesGantt:dashboard.leavesGantt,
     orgId: auth.userDetails.organizationId,
     fetchingLeavesGantt:dashboard.fetchingLeavesGantt,
    // viewType: task.viewType,
    // grantTask:task.grantTask,
    // fetchingGrantTask:task.fetchingGrantTask
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLeavesGantt
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(LeavesGanttChart);


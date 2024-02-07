import React from "react";
import {Avatar, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ApprovalIcon from '@mui/icons-material/Approval';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TocIcon from '@mui/icons-material/Toc';
import { MultiAvatar } from "../../../Components/UI/Elements";

const TaskActionLeft = props => {
  return (
    <div class=" flex items-center" >
      <Tooltip
        title={<FormattedMessage id="app.myTasks" defaultMessage="My Tasks" />}
      >
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("table")}
          style={{
            color: props.viewType === "table" && "#1890ff",
            cursor:"pointer"
          }}
        ><Avatar style={{background:"#FF9500"}}>
           <TocIcon className="text-white"  />
           </Avatar>
        </span>
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.mytaskView" defaultMessage="My Tasks- Gantt View" />}
      >
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("gantt")}
          style={{
            color: props.viewType === "gantt" && "#1890ff",
            cursor:"pointer"
          }}
        > 
        <Avatar style={{background:"#FF9500"}}><LeaderboardIcon  className="text-white"    /></Avatar>
        
        
        </span>
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.approvals" defaultMessage="Approvals" />}
      >  
        
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("approve")}
          style={{
            color: props.viewType === "approve" && "#1890ff",
            cursor:"pointer"
          }}
        >
         <Avatar style={{background:"#FF9500"}}><FactCheckIcon  className="text-white" /></Avatar> 
        </span>
       
      </Tooltip>

      {/* <Tooltip
        title={<FormattedMessage id="app.deletedOpportunity" defaultMessage="Deleted Opportunity" />}
      >  
        
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("dashboard")}
          style={{
            color: props.viewType === "dashboard" && "#1890ff",
          }}
        >
          <DeleteIcon />
        </span>
       
      </Tooltip> */}
    
    </div>
  
  );
};

export default TaskActionLeft;

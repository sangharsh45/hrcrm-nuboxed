import React from "react";
import {Tooltip } from "antd";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import ApprovalIcon from '@mui/icons-material/Approval';

const TaskActionLeft = props => {
  return (
    <div class=" flex items-center" >
      <Tooltip
        title={<FormattedMessage id="app.myTask" defaultMessage="My Task" />}
      >
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("table")}
          style={{
            color: props.viewType === "table" && "#1890ff",
  
          }}
        > <LightbulbIcon  />
        
        </span>
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.approvals" defaultMessage="Approvals" />}
      >  
        
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setTaskViewType("approve")}
          style={{
            color: props.viewType === "approve" && "#1890ff",
          }}
        >
          <ApprovalIcon />
        </span>
       
      </Tooltip>

      <Tooltip
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
       
      </Tooltip>
    
    </div>
  
  );
};

export default TaskActionLeft;

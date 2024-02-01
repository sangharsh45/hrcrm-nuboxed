import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";

const ExpenseActionLeft = (props) => {
    return (
        <div class=" flex items-center" >
          <Tooltip
        title={<FormattedMessage id="app.card" defaultMessage="Card" />}
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <GridViewIcon style={{fontSize:"1.4rem"}}  />
          </span>
       
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.list" defaultMessage="List" />}
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",

            }}
          >
            
            <TocIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
      <Tooltip
        title="Group"
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            
            <ViewWeekIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
        </div>
    )
}

export default ExpenseActionLeft; 
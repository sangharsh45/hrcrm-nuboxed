import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { Tooltip } from "antd";

const MileageActionLeft = (props) => {
    return (
        <div class=" flex items-center" >
          <Tooltip
        title={<FormattedMessage id="app.card" defaultMessage="Card" />}
      >
       
          <span class=" mr-2 cursor-pointer"
            onClick={() => props.setMileageViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <GridViewIcon style={{fontSize:"1.4rem"}}  />
          </span>
       
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.all" defaultMessage="All" />}
      >
       
       <span class=" mr-2 cursor-pointer text-4"
            onClick={() => props.setMileageViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            
            <TocIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
      <Tooltip title="Group">
      <span class=" mr-2 cursor-pointer text-4"
            onClick={() => props.setMileageViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <ViewWeekIcon/>
          </span>
      </Tooltip>

        </div>
    )
}

export default MileageActionLeft; 
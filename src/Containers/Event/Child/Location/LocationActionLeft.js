import React from 'react'
import { FlexContainer } from '../../../../Components/UI/Layout'
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";

const LocationActionLeft = (props) => {
    return (
        <FlexContainer alignItems='center'>
          <Tooltip
        title={<FormattedMessage id="app.card" defaultMessage="Card" />}
      >
       
          <span
            onClick={() => props.setLocationViewType("card")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "card" && "#1890ff",
              // fontSize: "1.0625em",
              // cursor: "pointer",
            }}
          >
            <GridViewIcon style={{fontSize:"1.4rem"}}  />
          </span>
       
      </Tooltip>

      {/* <Tooltip
        title={<FormattedMessage id="app.list" defaultMessage="List" />}
      >
       
          <span
            onClick={() => props.setExpenseViewType("tile")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "tile" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            
            <TocIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip> */}
        </FlexContainer>
    )
}

export default LocationActionLeft; 


import React from 'react'
import { FlexContainer } from '../../../../Components/UI/Layout'
import LanguageIcon from '@mui/icons-material/Language';
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";

const LocationActionLeft = (props) => {
    return (
        <FlexContainer alignItems='center'>
          <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="List View" />}
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
            <TocIcon style={{fontSize:"1.4rem"}}  />
          </span>
       
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.mapView" defaultMessage="Map View" />}
      >
       
          <span
            onClick={() => props.setLocationViewType("map")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "map" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            
            <LanguageIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
        </FlexContainer>
    )
}

export default LocationActionLeft; 


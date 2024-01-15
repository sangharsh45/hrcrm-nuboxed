import React, { useEffect,useState } from "react";
import { FlexContainer } from '../../../../Components/UI/Layout'
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import { Badge, Tooltip } from "antd";
import {getLocationRecords} from "./LocationAction";

const LocationActionLeft = (props) => {
  useEffect(() => {
    if (props.viewType === "card") {
      props.getLocationRecords(props.orgId);
    }
  }, [props.viewType]);
    return (
        <FlexContainer alignItems='center'>
          <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="List View" />}
      >
         <Badge
          size="small"
           count={(props.viewType === "card" && props.recordData.locCount) || 0}
          overflowCount={999}
        >
          <span
            onClick={() => props.setLocationViewType("card")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "card" && "#1890ff",            
            }}
          >
            <TocIcon style={{fontSize:"1.4rem"}}  />
          </span>
          </Badge>
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.mapView" defaultMessage="Map View" />}
      >
           <Badge
          size="small"
          // count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            onClick={() => props.setLocationViewType("map")}
            style={{
              marginLeft: "0.5rem",
              color: props.viewType === "map" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            
            <LanguageIcon  
            // icon={solid('users')}
             />
          </span>
          </Badge>
      </Tooltip>
        </FlexContainer>
    )
}
const mapStateToProps = ({ auth,location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  recordData:location.recordData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocationRecords
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationActionLeft)
);



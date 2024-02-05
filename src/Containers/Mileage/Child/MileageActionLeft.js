import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { Tooltip } from "antd";
import { connect } from "react-redux";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

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
        title={<FormattedMessage id="app.List" defaultMessage="List" />}
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
      <Tooltip title="Category">
      <span class=" mr-2 cursor-pointer text-4"
            onClick={() => props.setMileageViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <ViewWeekIcon/>
          </span>
      </Tooltip>
      {props.user.mileageFullListInd === true && (
      <Tooltip
        title="All"
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
            
            <ListAltIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
       )}

        </div>
    )
}

const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MileageActionLeft)
);
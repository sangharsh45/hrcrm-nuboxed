import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TocIcon from '@mui/icons-material/Toc';
import { Button, Input, Tooltip, Badge } from "antd";
import { FormattedMessage } from "react-intl";
import GridViewIcon from '@mui/icons-material/GridView';
import TableViewIcon from "@mui/icons-material/TableView";
import GroupsIcon from "@mui/icons-material/Groups";
import CategoryIcon from '@mui/icons-material/Category';
import { AreaChartOutlined } from '@ant-design/icons';

const { Search } = Input;

const LeavesActionLeft = (props) => {
  useEffect(() => {
    // if (props.viewType === "table") {
    //   props.getRecords(props.orgId);
    // }
  }, [props.viewType]);
  return (
    <div class=" flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.tileView" defaultMessage="Tile View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            <GridViewIcon />
          </span>
      
      </Tooltip>

      {/* <Tooltip
        title={<FormattedMessage id="app.tableView" defaultMessage="Table View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
              <GroupsIcon />
          </span>
      
      </Tooltip> */}
      <Tooltip
        title={<FormattedMessage id="app.cardView" defaultMessage="Card View" />}
      >  <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setLeavesViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
              <TocIcon />
          </span>
      
      </Tooltip>
     
      <Tooltip
        title="Group"
      >
       
          <span
            onClick={() => props.setLeavesViewType("list")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "list" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            
            <CategoryIcon  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>

      <Tooltip
        title="Grantt"
      >
       
          <span
            onClick={() => props.setLeavesViewType("grant")}
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "grant" && "#1890ff",
              fontSize: "1.0625em",
              cursor: "pointer",
            }}
          >
            
            <AreaChartOutlined  
            // icon={solid('users')}
             />
          </span>
    
      </Tooltip>
    </div>
  );
};

const mapStateToProps = ({ auth, employee }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeavesActionLeft)
);

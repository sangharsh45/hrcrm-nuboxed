import React, { useEffect } from "react";
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PeopleIcon from '@mui/icons-material/People';
import { CheckCircleTwoTone } from "@ant-design/icons";
import {getdealsRecord,getdealsAllRecord} from "../DealAction";
import { StopTwoTone, TableOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const DealActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];

  useEffect(() => {
    if (props.viewType === "table") {
      props.getdealsRecord(props.userId);
    } else if (props.viewType === "all") {
      props.getdealsAllRecord(props.userId);
    } 
  }, [props.viewType, props.userId]);
// useEffect(() => {
//   props.getdealsRecord(props.userId)
//   }, [props.userId]);

  const {
    viewType,
   setDealViewType,
    recorddeleteOpportunityData,
    user,
    lostOpportunityData,
    closeOpportunityData,
    recordData,
  } = props;

  return (
    <div class=" flex items-center">
      <Badge
        size="small"
         count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
        <Tooltip
          title={
            <FormattedMessage
              id="app.listView"
              defaultMessage="List View"
            />
          }
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => setDealViewType("table")}
            style={{
              color: viewType === "table" && "#1890ff",
              // cursor:"pointer"
            }}
          >
            {" "}
            <LightbulbIcon style={{color:"rgb(214, 144, 149)"}} />
          </span>
        </Tooltip>
      </Badge>
      <Tooltip
          title={
            <FormattedMessage id="app.stageview" defaultMessage="Stage View" />
          }
        >
        <Badge
        size="small"
        //  count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              color: viewType === "stage" && "#1890ff",
            }}
            // iconType="table"
            tooltipTitle="Stage View"
            onClick={() => props.setDealViewType("stage")}
          >
           <TableOutlined/>
          </span>
          </Badge>
        </Tooltip>
        <Tooltip title={"Won"}>
      <Badge
          size="small"
          // count={
          //   (viewType === "won" &&
          //   wonOpportunityData.OpportunityDetailsbyWonInd) ||
          //   0
          // }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setDealViewType("won")}
            style={{
           
              color: props.viewType === "won" && "#1890ff",
              // cursor:"pointer"
            }}
          >
            {" "}
            <CheckCircleTwoTone type="check-circle" theme="twoTone" twoToneColor="#24D8A7" />
          </span>
          </Badge>
      </Tooltip>
        <Tooltip title={"Close"}>
        {" "}
        <Badge
          size="small"
        //   count={
        //     (viewType === "close" &&
        //       closeOpportunityData.OpportunityDetailsByCloseInd) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            // onClick={() => props.setOpportunityViewType("close")}
            style={{
              color: props.viewType === "close" && "#1890ff",
           
            }}
          >
            {" "}
            <LockOpenIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip title={"Lost"}>
        <Badge
          size="small"
        //   count={
        //     (viewType === "lost" &&
        //       lostOpportunityData.OpportunityDetailsbyLostInd) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            // onClick={() => props.setOpportunityViewType("lost")}
            style={{
              color: props.viewType === "lost" && "#1890ff",
            
            }}
          >
            {" "}
            <StopTwoTone type="stop" theme="twoTone" twoToneColor="red" />
          </span>
        </Badge>
      </Tooltip>
   
      
        <Tooltip
          title="Teams"
        >
           <Badge
          size="small"
        //   count={
        //     (viewType === "close" &&
        //       closeOpportunityData.OpportunityDetailsByCloseInd) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              color: viewType === "teams" && "#1890ff",
           
            }}
            // iconType="table"
            tooltipTitle="Teams"
            onClick={() => props.setDealViewType("teams")}
          >
         <PeopleIcon/>
          </span>
          </Badge>
        </Tooltip>
        <Tooltip
          title="All"
        >
     <Badge
        size="small"
         count={(viewType === "all" &&   props.dealsAllRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              color: viewType === "all" && "#1890ff",
              cursor:"pointer"
            }}
            // iconType="table"
            tooltipTitle="All"
            onClick={() => props.setDealViewType("all")}
          >
          ALL
          </span>
          </Badge>
        </Tooltip>
     
      <Tooltip
        title={
          <FormattedMessage
            id="app.deletedOpportunity"
            defaultMessage="Deleted Opportunity"
          />
        }
      >
        {" "}
        <Badge
          size="small"
        //   count={
        //     (viewType === "dashboard" &&
        //       recorddeleteOpportunityData.opportunityDetails) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            // onClick={() => props.setOpportunityViewType("dashboard")}
            style={{
              // cursor:"pointer"
              //color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
            <DeleteIcon />
          </span>
        </Badge>
      </Tooltip>

    
      {/* <Tooltip
        title={
          <FormattedMessage
            id="app.deletedOpportunity"
            defaultMessage="Deleted Opportunity"
          />
        }
      >
        <span
          class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setOpportunityViewType("Map")}
          style={{
            color: props.viewType === "Map" && "#1890ff",
          }}
        >
          <DeleteIcon />
        </span>
       
      </Tooltip> */}
    </div>
  );
};
const mapStateToProps = ({ deal, auth, opportunity }) => ({
  user: auth.userDetails,
  recordData: opportunity.recordData,
  dealsAllRecord:deal.dealsAllRecord,
  userId: auth.userDetails.userId,
  dealsRecord:deal.dealsRecord,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getdealsRecord,
      getdealsAllRecord
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealActionLeft)
);

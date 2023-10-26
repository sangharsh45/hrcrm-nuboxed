import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Input, Button, Tooltip,Badge  } from "antd";
import {
  inputDataSearch,
  getRecords,
  getAllRecords,
  setShipperDashboardType,
  setSelectedTimeInterval,
  setTimeRange,
} from "./ShipperAction";
import {
  DeleteOutlined,
  TableOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import moment from "moment";

const { Search } = Input;

const ShipperActionLeft = (props) => {
  const {
    user,
    setShipperDashboardType,
    viewType,
    dateRangeList,
    setSelectedTimeInterval,
    setTimeRange,
    startDate,
    endDate,
  } = props;
  const creationDate = user.creationDate;
  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "all") {
      props.getAllRecords();
    }
  }, [props.viewType, props.userId]);

  return (
    <FlexContainer alignItems="center">
      <Tooltip title="List View">
      <Badge size="small"
           count={props.recordData.shipper || 0}
           >         
          <span
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "#1890ff",
            fontSize: "17px",
              cursor: "pointer",
          }}
          onClick={() => props.setShipperViewType("table")}
          >
          </span>          
        </Badge>
      </Tooltip>
      {user.designation === "Manager" && user.functionName === "Management" && (
        <Tooltip title="All Shipper">
           <Badge size="small" 
            count={props.recordAllData.shipper || 0}
            >
          <span
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "all" && "#1890ff",
            }}
            onClick={() => props.setShipperViewType("all")}
          >All
          </span>
          </Badge>
        </Tooltip>
      )}
      {/* <Tooltip title="Deleted Shipper">
        <DeleteOutlined
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "grid" && "red",
          }}
          onClick={() => props.setShipperViewType("grid")}
        />
      </Tooltip> */}
      <Tooltip title="Dashboard View">
        <AreaChartOutlined
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "#1890ff",
          }}
          onClick={() => props.setShipperViewType("dashboard")}
        />
      </Tooltip>
      {viewType === "dashboard" && (
        <FlexContainer alignItems="center">
          <TimeInterval
            times={dateRangeList}
            handleClick={setSelectedTimeInterval}
          />
          <StyledRangePicker
            style={{ marginLeft: 8 }}
            disabled={
              1
              // organization.subscriptionType === "FREE" ||
              // organization.subscriptionType === "STARTER"
            }
            onChange={(range) => {
              setTimeRange(range[0], range[1]);
              this.handlerangeClick();
            }}
            disabledDate={(date) =>
              moment(date).isBefore(creationDate) ||
              moment(date).isAfter(moment())
            }
          />
        </FlexContainer>
      )}
      &nbsp;&nbsp;
      <div style={{ marginLeft: "30px" }}>
        <Search
          placeholder="Search By Name"
          onSearch={(value) => {
            props.inputDataSearch(value);
            props.setCurrentData(value);
          }}
          allowClear
          enterButton
        />
      </div>
      &nbsp; &nbsp;
      <Button
        type={props.currentData ? "primary" : "default"}
        onClick={props.handleClear}
      >
        Clear
      </Button>
      {/* &nbsp; &nbsp;
      {props.viewType === "table" ? (
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          # Records - {props.recordData.shipper || 0}{" "}
        </div>
      ) : props.viewType === "all" ? (
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          # Records - {props.recordAllData.shipper || 0}{" "}
        </div>
      ) : null} */}
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, shipper }) => ({
  user: auth.userDetails,
  recordData: shipper.recordData,
  recordAllData: shipper.recordAllData,
  userId: auth.userDetails.userId,
  dateRangeList: shipper.dateRangeList,
  startDate: shipper.startDate,
  endDate: shipper.endDate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputDataSearch,
      getRecords,
      getAllRecords,
      setShipperDashboardType,
      setSelectedTimeInterval,
      setTimeRange,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionLeft);

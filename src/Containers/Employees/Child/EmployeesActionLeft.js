import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import { inputEmployeeDataSearch, getRecords } from "../EmployeeAction";
import { Button, Input, Tooltip, Badge } from "antd";
import { FormattedMessage } from "react-intl";
import TableViewIcon from "@mui/icons-material/TableView";
import GroupsIcon from "@mui/icons-material/Groups";
import GridViewIcon from '@mui/icons-material/GridView';
const { Search } = Input;
const Option = StyledSelect.Option;

const EmployeesActionLeft = (props) => {
  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.orgId);
    }
  }, [props.viewType]);
  return (
    <div class=" flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.tileView" defaultMessage="Tile View" />}
      > 
       <Badge
          size="small"
          count={
            (props.viewType === "tile" &&
              props.employeerecordData.EmployeeListByLiveInd) ||
            0
          }
          overflowCount={999}
        >
      <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setEmployeeViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            <GridViewIcon />
          </span>
          </Badge> 
      </Tooltip>
      <Tooltip title={<FormattedMessage id="app.tableView" defaultMessage="Table View" />}>
        <Badge
          size="small"
          count={
            (props.viewType === "table" &&
              props.employeerecordData.EmployeeListByLiveInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setEmployeeViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <GroupsIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip title={<FormattedMessage id="app.cardView" defaultMessage="Card View" />}>
    
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setEmployeeViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <TocIcon />
          </span>
    
      </Tooltip>

      <div class=" ml-6 h-6">
        <Input
          placeholder="Search By Name"
          width={"100%"}
          // suffix={suffix}
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
          // onSearch={(value) => {
          //   props.inputEmployeeDataSearch(value);
          //   props.setCurrentData(value);
          // }}
          // allowClear
          // enterButton
        />
      </div>
      <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputEmployeeDataSearch(props.currentData);
          }}
        >
          Submit
        </Button>
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.handleClear();
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
        <div style={{ width: "25%" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="cretiondate">Creation Date</Option>
            <Option value="workplace">Work Place</Option>
           
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({ auth, employee }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  employeerecordData: employee.employeerecordData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputEmployeeDataSearch,
      getRecords,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionLeft)
);

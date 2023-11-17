import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import { inputEmployeeDataSearch, getRecords } from "../EmployeeAction";
import { Button, Input, Tooltip, Badge } from "antd";
import { FormattedMessage } from "react-intl";
import {getDepartments} from "../../Settings/Department/DepartmentAction"
import { getlocation } from "../../Event/Child/Location/LocationAction";
import GroupsIcon from "@mui/icons-material/Groups";
import GridViewIcon from '@mui/icons-material/GridView';
const { Search } = Input;
const Option = StyledSelect.Option;

const EmployeesActionLeft = (props) => {
  useEffect(() => {
    if (props.viewType === "tile") {
      props.getRecords(props.orgId);
    }else if (props.viewType === "table") {
      props.getRecords(props.orgId);
    } else if (props.viewType === "card") {
      props.getRecords(props.orgId);
    }
    props.getlocation(props.orgId);
    props.getDepartments();
  }, [props.viewType]);
  // useEffect(()=>{
  //   props.getCountries();
  // })
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
      {/* <Tooltip title={<FormattedMessage id="app.tableView" defaultMessage="Table View" />}>
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
      </Tooltip> */}
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
            <TocIcon />
          </span>
          </Badge>
      </Tooltip>

      <div class=" ml-6 h-6 w-60">
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
        <div style={{ width: "35%" ,marginTop:"0.55rem"}}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="cretiondate">Creation Date</Option>
          <Option value="AtoZ">A To Z</Option>
            <Option value="ZtoA">Z To A</Option>
           
          </StyledSelect>
        </div>
        <div class=" flex items-center ml-4"  style={{border:"0.5px solid lightgray "}} >
                  <select
                    // placeholder="Select Location"
                    //  defaultValue={partners}
                    style={{ width: "auto",margin:"auto"}}
                     onChange={props.handleLocationChange}
                     value={props.selectedLocation}
                  >
                    <option value="">All Locations</option>
                    {props.showLocation.map((item) => {
                      return (
                        <option value={item.locationName}>
                          {item.locationName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class=" flex items-center ml-4"  style={{border:"0.5px solid lightgray "}} >
                  <select
                    // placeholder="Select Location"
                    //  defaultValue={partners}
                    style={{ width: "auto",margin:"auto"}}
                     onChange={props.handleDepartmentChange}
                     value={props.selectedDepartment}
                     disabled={!props.selectedLocation}
                  >
                    <option value="">All Department</option>
                    {props.departments.map((item) => {
                      return (
                        <option value={item.departmentName}>
                          {item.departmentName}
                        </option>
                      );
                    })}
                  </select>
                </div>
    </div>
  );
};

const mapStateToProps = ({ auth,location,departments, employee }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  showLocation:location.showLocation,
  departments: departments.departments,
  employeerecordData: employee.employeerecordData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputEmployeeDataSearch,
      getRecords,
      getlocation,
      getDepartments
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionLeft)
);

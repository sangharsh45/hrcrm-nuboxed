import { Popover,Tooltip } from "antd";
import React, {  } from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,
  setDashboardViewType
} from "../DashboardAction";
import PersonIcon from '@mui/icons-material/Person';
import { bindActionCreators } from "redux";
import TimeInterval from "../../../Utils/TimeInterval";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const DashboardActionLeft = (props) => {
  const {
    setSelectedTimeIntervalReport,
    dateRangeList,
    viewType,
    handleButtonClick,
    activeButton,
    user,
  } = props;

  return (
    <>
      <div class=" flex items-center "  >
        
        <div class="flex w-[12rem] justify-between">

        <span class=" cursor-pointer "
          onClick={() => props.setDashboardViewType("test")}
          style={{
            color: props.viewType === "test" && "tomato",
  
          }}> 
              <Tooltip title="My Details">
          <PersonIcon  style={{ fontSize: "1rem" }}/>
          </Tooltip>
        
        </span>
        <span class="cursor-pointer" 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "#1890ff",
          
        }}
        >
         <Tooltip title="Task">
             
     <FactCheckIcon
                style={{ fontSize: "1rem",color:"#1890ff" }}
              />
              </Tooltip>
        </span>
  
       
    {user.crmInd === true && (
        <span class="cursor-pointer"
        onClick={() =>  handleButtonClick("Customer")} 
        style={{
          color:activeButton ==="Customer" ? activeButton === "Customer" && "#1890ff" && viewType === "ALL" && "#444" : viewType === "ALL" && "#1890ff" ,
       
        }}
        >
          <Tooltip title="Prospects">
          <ApartmentIcon

style={{ fontSize: "1rem",color:"#1890ff" }}
/>
</Tooltip>        
        </span>
)}
       

   
    {user.erpInd === true && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "#1890ff",
          
        }}
        >
          <Tooltip title="Customers">
          <AcUnitIcon
                style={{ fontSize: "1rem",color:"#1890ff" }}
              />
          </Tooltip>
        </span>
    )}
{user.imInd === true  && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Order")} 
        style={{
          color:activeButton === "Order" && "#1890ff",
    
        }}
        >  <Tooltip title="Order">
          <DynamicFeedIcon
                style={{ fontSize: "1rem",color:"#1890ff" }}
              />
           </Tooltip>
        </span>
)}
   
    {user.erpInd === true && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Finance")} 
        style={{
          color:activeButton === "Finance" && "#1890ff",
          
        }}
        >
           <Tooltip title="Finance">
          <ReceiptIcon  style={{ fontSize: "1rem" ,color:"#1890ff"}}/>
          </Tooltip>
          
        </span>
    )}
        {user.imInd === true  && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "#1890ff",
    
        }}
        >  
        <Tooltip title="Investors">
          <LocationCityIcon

style={{ fontSize: "1rem" ,color:"#1890ff"}}
/>
</Tooltip>       
        </span>
)}
    
   </div>
   
      <>
      <div class="ml-2">
    <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />
        </div>
        {/* <Popover>
          <StyledRangePicker
            style={{width:"30%"}}
            onChange={(range) => {
              props.setTimeRangeReport(range[0], range[1]);
              console.log(range);
            }}

          />
        </Popover> */}
        </>

      </div>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  dateRangeList: dashboard.dateRangeList,
  viewType:dashboard.viewType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
      setDashboardViewType   
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardActionLeft);

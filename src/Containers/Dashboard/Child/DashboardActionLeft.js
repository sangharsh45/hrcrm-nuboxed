import { Badge, Popover,Tooltip } from "antd";
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
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class=" cursor-pointer "
          onClick={() => props.setDashboardViewType("test")}
          style={{
            color: props.viewType === "test" && "tomato",
  
          }}> 
              <Tooltip title="My Details">
          <PersonIcon  style={{ fontSize: "1rem" }}/>
          </Tooltip>
        
        </span>
        </Badge>
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer" 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "tomato",
          
        }}
        >
         <Tooltip title="Task">
             
     <FactCheckIcon
                style={{ fontSize: "1rem", }}
              />
              </Tooltip>
        </span>
  </Badge>
       
    {user.crmInd === true && (
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer"
        onClick={() =>  handleButtonClick("Customer")} 
        style={{
          color:activeButton ==="Customer" ? activeButton === "Customer" && "tomato" && viewType === "ALL" && "#444" : viewType === "ALL" && "tomato" ,
       
        }}
        >
          <Tooltip title="Prospects">
          <ApartmentIcon

style={{ fontSize: "1rem", }}
/>
</Tooltip>        
        </span>
        </Badge>
)}
       

   
    {user.erpInd === true && (
         <Badge
         size="small"
         // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
         // overflowCount={999}
       >
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "tomato",
          
        }}
        >
          <Tooltip title="Customers">
          <AcUnitIcon
                style={{ fontSize: "1rem", }}
              />
          </Tooltip>
        </span>
        </Badge>
    )}
{user.imInd === true  && (
      <Badge
      size="small"
      // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
      // overflowCount={999}
    >
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Order")} 
        style={{
          color:activeButton === "Order" && "tomato",
    
        }}
        >  <Tooltip title="Order">
          <DynamicFeedIcon
                style={{ fontSize: "1rem", }}
              />
           </Tooltip>
        </span>
        </Badge>
)}
   
    {user.erpInd === true && (
        <Badge
        size="small"
        // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
        // overflowCount={999}
      >
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Finance")} 
        style={{
          color:activeButton === "Finance" && "tomato",
          
        }}
        >
           <Tooltip title="Finance">
          <ReceiptIcon  style={{ fontSize: "1rem" ,}}/>
          </Tooltip>
          
        </span>
        </Badge>
    )}
        {user.imInd === true  && (
            <Badge
            size="small"
            // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            // overflowCount={999}
          >
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "tomato",
    
        }}
        >  
        <Tooltip title="Investors">
          <LocationCityIcon

style={{ fontSize: "1rem" ,}}
/>
</Tooltip>       
        </span>
        </Badge>
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

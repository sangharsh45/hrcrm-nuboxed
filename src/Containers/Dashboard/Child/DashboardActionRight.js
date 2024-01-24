import { Popover, } from "antd";
import React, {  } from "react";
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,

} from "../DashboardAction";
import { bindActionCreators } from "redux";
import TimeInterval from "../../../Utils/TimeInterval";
import { FormattedMessage } from "react-intl";

const HeaderActionRight = (props) => {
  const {
    setSelectedTimeIntervalReport,
    dateRangeList,
    viewType,
    setDashboardViewType,
    handleButtonClick,
    activeButton,
    user,
  } = props;

  return (
    <>
      <div class=" flex items-center justify-evenly"  >
        
        <div class="flex w-[15rem] justify-between">

        <span class="cursor-pointer" 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "#1890ff",
          
        }}
        >
            <FormattedMessage
                        id="app.tasks"
                        defaultMessage="Tasks"
                      />
          {/* Tasks */}
        </span>
  
       
    {user.crmInd === true && (
        <span class="cursor-pointer"
        onClick={() =>  handleButtonClick("Customer")} 
        style={{
          color:activeButton ==="Customer" ? activeButton === "Customer" && "#1890ff" && viewType === "ALL" && "#444" : viewType === "ALL" && "#1890ff" ,
       
        }}
        >
           <FormattedMessage
                        id="app.prospect"
                        defaultMessage="Prospect"
                      />
           
        </span>
)}
       
    {user.imInd === true  && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "#1890ff",
    
        }}
        >  
          <FormattedMessage
                        id="app.investors"
                        defaultMessage="Investors"
                      />   
           
        </span>
)}
   
    {user.erpInd === true && (
        <span class="cursor-pointer"
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "#1890ff",
          
        }}
        >
           <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      /> 
          
        </span>
    )}
   </div>
   
      <>
      <div class="">
    <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />
        </div>
        <Popover>
          <StyledRangePicker
            style={{width:"30%"}}
            onChange={(range) => {
              props.setTimeRangeReport(range[0], range[1]);
              console.log(range);
            }}

          />
        </Popover>
        </>

      </div>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  dateRangeList: dashboard.dateRangeList,


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionRight);
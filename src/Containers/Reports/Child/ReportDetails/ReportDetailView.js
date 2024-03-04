import { Badge, Button, Tooltip } from "antd";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ReportDetailView extends Component {
  render() {
    const {
        reportTypes,
        handleIconClick,
        reportType,
        investorTypes,
        selectedReportType,
        dateRangeList,
        reportViewType,
        setReportViewType,
        setTimeRangeReport,
        setSelectedReportType,
        setSelectedTimeIntervalReport,
        role,
        user,
        activeIcon,
        dropdownData,
        selectedSubReportType,
        reportOpportunitySubTypes,
        reportRequirementSubTypes,
        setSubSelectedReportType,
        reportTaskSubTypes,
        reportMileageSubTypes,
      } = this.props;

    return (
      <>
             <span class="cursor-pointer ml-2"
        //   onClick={() => handleIconClick("prospectTypes")}
      
        >
          <Tooltip title="Tasks">
<Button>Tasks</Button>
</Tooltip>        
        </span>

        {user.crmInd === true && (
        <Badge
        size="small"
      >
        <span class="cursor-pointer ml-2"
          onClick={() => handleIconClick("prospectTypes")}
      
        >
          <Tooltip title="Prospects">
<Button>Prospects</Button>
</Tooltip>        
        </span>
        </Badge>
 )} 
        <div class=" flex mt-3">
        {user.imInd === true  && (
            <Badge
            size="small"
            // count={(props.reportViewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            // overflowCount={999}
          >
        <span class="cursor-pointer ml-2"
         onClick={() => handleIconClick("investorTypes")}
        // onClick={() => setReportViewType("investor")} 
        // style={{
        //   color:activeButton === "Investors" && "tomato",
    
        // }}
        >  
        <Tooltip title="Investors">
<Button>Investors</Button>
</Tooltip>       
        </span>
        </Badge>
 )} 
        <span class="cursor-pointer ml-2"
        //   onClick={() => handleIconClick("prospectTypes")}
      
        >
          <Tooltip title="Order">
<Button>Order</Button>
</Tooltip>        
        </span>
        </div>
        <div class=" flex mt-3">
        <span class="cursor-pointer ml-2"
        //   onClick={() => handleIconClick("prospectTypes")}
      
        >
        
<Button>Production</Button>
     
        </span>
        <span class="cursor-pointer ml-2"
        //   onClick={() => handleIconClick("prospectTypes")}
      
        >
<Button>Receivables</Button>      
        </span>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ report, auth }) => ({
    reportTypes: report.reportTypes,
    investorTypes:report.investorTypes,
    role: auth.userDetails.role,
    user: auth.userDetails,
    reportType: report.reportType,
    reportTypes: report.reportTypes,
    dateRangeList: report.dateRangeList,
    reportViewType: report.reportViewType,
    selectedReportType: report.selectedReportType,
    selectedSubReportType: report.selectedSubReportType,
    reportOpportunitySubTypes: report.reportOpportunitySubTypes,
    reportRequirementSubTypes: report.reportRequirementSubTypes,
    reportMileageSubTypes: report.reportMileageSubTypes,
    reportTaskSubTypes: report.reportTaskSubTypes,
    reportTaskSubTypes: report.reportTaskSubTypes,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {

      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailView);
  

const ReportItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-row w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       {value}
   </div>
    </div>
  );
};
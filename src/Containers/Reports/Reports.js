// import React, { useEffect, Suspense,useState, lazy } from "react";
// import { BundleLoader } from "../../Components/Placeholder";
// import { connect } from "react-redux";
// import { setTimeRangeReport,getAllReportInvestors } from "./ReportAction";
// import { bindActionCreators } from "redux";
// import ReportsCardList from "./Child/ReportsCardList";

// const ReportHeader = lazy(() => import("./Child/ReportHeader"));
// const Requirement = lazy(() => import("./Child/MyViewReports/Requirement"));
// const OrgSelected = lazy(() => import("./Child/OrganizationView/Selected"));
// const OrgRequirement = lazy(() => import("./Child/OrganizationView/Requirement"));
// const Selected = lazy(() => import("./Child/MyViewReports/Selected"));

// const Reports = ({
//   setTimeRangeReport,
//   getAllReportInvestors,
//   orgId,
//   allReportInvestors,
//   todayStartDate,
//   todayEndDate,
//   reportViewType,
//   selectedReportType,
//   selectedSubReportType,
// }) => {
//   handleIconClick = (iconKey) => {
//     this.setState({ activeIcon: iconKey });
//   };
  
//   const [currentUser, setCurrentUser] = useState("");
//   const handleDropChange = (value) => {
//     setCurrentUser(value);
//     getAllReportInvestors(orgId);
//   };
//   useEffect(() => {
//     setTimeRangeReport(todayStartDate, todayEndDate);
//   }, [setTimeRangeReport, todayStartDate, todayEndDate]);

//   return (
//     <>
//       <ReportHeader   handleDropChange={handleDropChange}/>
//       <Suspense fallback={<BundleLoader />}>
//       {reportViewType === "table" ? (
//           <ReportsCardList 
//           allReportInvestors={allReportInvestors} />
//         ) : null}
//         {reportViewType === "ME" && (
//           <>
//             {selectedReportType === "Requirement" && <Requirement />}
//             {selectedReportType === "Selected" && <Selected />}
//           </>
//         )}
//         {reportViewType === "ALL" && (
//           <>
//             {selectedReportType === "Requirement" && <OrgRequirement />}
//             {selectedReportType === "Selected" && <OrgSelected />}
//           </>
//         )}
//       </Suspense>
//     </>
//   );
// };

// const mapStateToProps = ({ auth, report }) => ({
//   reportViewType: report.reportViewType,
//   allReportInvestors:report.allReportInvestors,
//   orgId:auth.userDetails.organizationId,
//   selectedReportType: report.selectedReportType,
//   fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
//   fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
//   selectedSubReportType: report.selectedSubReportType,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setTimeRangeReport,
//       getAllReportInvestors,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Reports);















import React, {  Suspense, lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport,getAllReportInvestors } from "./ReportAction";
import { bindActionCreators } from "redux";
import ReportsCardList from "./Child/ReportsCardList";
import ReportDetails from "./Child/ReportDetails/ReportDetails";
const ReportHeader =lazy(()=> import("./Child/ReportHeader"));
const Requirement =lazy(()=> import("./Child/MyViewReports/Requirement"));
const OrgSelected =lazy(()=> import("./Child/OrganizationView/Selected"));
const OrgRequirement =lazy(()=> import("./Child/OrganizationView/Requirement"));
const Selected =lazy(()=> import("./Child/MyViewReports/Selected"));

class Reports extends React.Component {
  state = {
    currentUser: "",
    dropdownData: {
      investorTypes: ["Investor List","Investor all contacts","All Deals","Open Deals","Closed Deals","Pitch"],
      prospectTypes: ["Prospect List","Prospect all contacts","All Opportunities","Open Opportunities","Closed Opportunities","Pitch"],
      hrTypes: ["Employee","Suspended Employee","All Attendedance","Expenses","Mileages","Leaves"],
      recruitProType: ["Requirement", "Selected"],
      // Add more icons and corresponding items as needed
    },
    activeIcon: null,
  };
    handleIconClick = (iconKey) => {
    this.setState({ activeIcon: iconKey });
  };
  handleDropChange = (value) => {
    this.setState({ currentUser: value });
    this.getAllReportInvestors(this.props.orgId);
  };
  componentDidMount() {
    const { setTimeRangeReport, todayStartDate, todayEndDate } = this.props;
    setTimeRangeReport(todayStartDate, todayEndDate);
  }
  render() {
    const { reportViewType, selectedReportType, selectedSubReportType } = this.props;
    console.log("selectedSubReportType", selectedSubReportType, selectedReportType)
    return (
      <React.Fragment>
        <ReportHeader 
        handleDropChange={this.handleDropChange}
        handleIconClick={this.handleIconClick}
        activeIcon={this.state.activeIcon}
        dropdownData={this.state.dropdownData}
        />
        <Suspense fallback={<BundleLoader />}>
          <ReportDetails
             handleDropChange={this.handleDropChange}
             handleIconClick={this.handleIconClick}
             activeIcon={this.state.activeIcon}
             dropdownData={this.state.dropdownData}
          />
        {this.state.currentUser === "Investor List" && (
    <ReportsCardList allReportInvestors={this.props.allReportInvestors} />
  )}
          {/* {reportViewType === "ME" && (
            <>

              {selectedReportType === "Requirement" && <Requirement />}
              {selectedReportType === "Selected" && <Selected />}
            </>
          )}
          {reportViewType === "ALL" && (
            <>

              {selectedReportType === "Requirement" &&
                <OrgRequirement />}
              {selectedReportType === "Selected" && <OrgSelected />}
            </>
          )} */}
        </Suspense>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ auth, report }) => ({
  reportViewType: report.reportViewType,
  orgId:auth.userDetails.organizationId,
  allReportInvestors:report.allReportInvestors,
  selectedReportType: report.selectedReportType,
  fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
  fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
  selectedSubReportType: report.selectedSubReportType
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTimeRangeReport,
      getAllReportInvestors,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reports);

import React, { Component, Suspense, lazy } from "react";
import ReportHeader from "./Child/ReportHeader";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport } from "./ReportAction";
import { bindActionCreators } from "redux";
import Requirement from "./Child/MyViewReports/Requirement";
import OrgSelected from "./Child/OrganizationView/Selected";
import OrgRequirement from "./Child/OrganizationView/Requirement";
import Selected from "./Child/MyViewReports/Selected";

class Reports extends React.Component {
  componentDidMount() {
    const { setTimeRangeReport, todayStartDate, todayEndDate } = this.props;
    setTimeRangeReport(todayStartDate, todayEndDate);
  }
  render() {
    const { reportViewType, selectedReportType, selectedSubReportType } = this.props;
    console.log("selectedSubReportType", selectedSubReportType, selectedReportType)
    return (
      <React.Fragment>
        <ReportHeader />
        <Suspense fallback={<BundleLoader />}>
          {reportViewType === "ME" && (
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
          )}
        </Suspense>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ auth, report }) => ({
  reportViewType: report.reportViewType,
  selectedReportType: report.selectedReportType,
  fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
  fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
  selectedSubReportType: report.selectedSubReportType
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTimeRangeReport,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reports);

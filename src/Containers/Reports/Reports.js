import React, {  Suspense, lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { setTimeRangeReport } from "./ReportAction";
import { bindActionCreators } from "redux";
const ReportHeader =lazy(()=> import("./Child/ReportHeader"));
const Requirement =lazy(()=> import("./Child/MyViewReports/Requirement"));
const OrgSelected =lazy(()=> import("./Child/OrganizationView/Selected"));
const OrgRequirement =lazy(()=> import("./Child/OrganizationView/Requirement"));
const Selected =lazy(()=> import("./Child/MyViewReports/Selected"));

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

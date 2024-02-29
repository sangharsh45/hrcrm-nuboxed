import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Popover } from "antd";
import { StyledSelect, StyledRangePicker } from "../../../Components/UI/Antd";
import dayjs from "dayjs";
import {
  setSelectedReportType,
  setSelectedTimeIntervalReport,
  setReportViewType,
  setTimeRangeReport,
  setSubSelectedReportType,
} from "../ReportAction";
import { TimeInterval } from "../../../Utils";
const Option = StyledSelect.Option;
class ReportActionLeft extends React.Component {
  render() {
    const {
      reportTypes,
      reportType,
      selectedReportType,
      dateRangeList,
      reportViewType,
      setReportViewType,
      setTimeRangeReport,
      setSelectedReportType,
      setSelectedTimeIntervalReport,
      role,
      user,
      selectedSubReportType,
      reportOpportunitySubTypes,
      reportRequirementSubTypes,
      setSubSelectedReportType,
      reportTaskSubTypes,
      reportMileageSubTypes,
    } = this.props;
    const creationDate = user.creationDate;
    const dynamicData = [{ userName: "Samli", id: "1" }, { userName: "priya", id: "2" }]
    console.log(selectedSubReportType)
    return (
      <>
          <div class=" flex items-center" >
            {/* <div style={{ width: user.department === "MANAGEMENT" ? "45%" : "45%" }}> */}
              <TimeInterval
                times={dateRangeList}
                handleClick={setSelectedTimeIntervalReport}
              />
            {/* </div> */}
            {/* <Popover>
              <StyledRangePicker
                style={{width:"35%"}}
                // style={{ marginLeft: 8, marginRight: 8 }}
                // disabled={subscriptionType !== "PROFESSIONAL"}
                onChange={(range) => setTimeRangeReport(range[0], range[1])}
                disabledDate={(date) =>
                  dayjs(date).isBefore(creationDate) ||
                  dayjs(date).isAfter(dayjs())
                }
              />
            </Popover> */}
          </div>
      </>
    );
  }
}
const mapStateToProps = ({ report, auth }) => ({
  reportTypes: report.reportTypes,
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
      setSelectedReportType,
      setSelectedTimeIntervalReport,
      setReportViewType,
      setTimeRangeReport,
      setSubSelectedReportType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReportActionLeft);

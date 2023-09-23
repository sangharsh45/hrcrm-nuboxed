import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Tag, Tooltip, Select, Popover } from "antd";
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
import { FlexContainer } from "../../../Components/UI/Layout";
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
      <FlexContainer alignItems="center">
          {user.department === "Management" && (
              <>
              <FlexContainer>
              <div>
                  <Tag
                    color={reportViewType === "ALL" ? "#FFA500" : "orange"}
                    style={{
                      cursor: "pointer",
                      fontWeight: reportViewType === "ALL" ? "bold" : null,
                      textAlign: "center",
                      // color: "orange",
                      borderColor: "orange",
                    }}
                    onClick={() => setReportViewType("ALL")}
                  >
                    {/* Organization */}
                    <FormattedMessage
                      id="app.organization"
                      defaultMessage="Organization"
                    />
                  </Tag>
                </div>
                <div>
                  <Tag
                    color={reportViewType === "ME" ? "	#FFA500" : "orange"}
                    style={{
                      cursor: "pointer",
                      fontWeight: reportViewType === "ME" ? "bold" : null,
                      textAlign: "center",
                      borderColor: "orange",
                    }}
                    onClick={() => setReportViewType("ME")}
                  >My View</Tag>
                </div>
                <div>
              {reportViewType === "ME" ? (
                <StyledSelect
                  showSearch
                  width={"20%"}
                  placeholder="Select Report"
                  onChange={(type) => setSelectedReportType(type)}
                  defaultValue={selectedReportType}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {reportTypes.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))}
                </StyledSelect>
              ) : (
                <StyledSelect
                  showSearch
                  width={"20%"}
                  placeholder="Select Report"
                  onChange={(type) => setSelectedReportType(type)}
                  defaultValue={selectedReportType}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {reportType.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))}
                </StyledSelect>
              )}

            </div>
                </FlexContainer>
              </>
            )}
    </FlexContainer>
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

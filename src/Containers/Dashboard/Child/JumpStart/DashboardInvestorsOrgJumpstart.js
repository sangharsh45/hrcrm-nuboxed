import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import {
  getDateWiseList,
  getSalesDateWiseList,
  getJumpInvestorlist,
  getJumpInvestor2list,
  getJumpInvestor3list,
  getJumpInvestor4list

} from "../../DashboardAction";

class DashboardInvestorsOrgJumpstart extends React.Component {
  constructor() {
    super();
    const startDate = moment().startOf("month");
    const endDate = moment();
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    this.state = {
      date: date,
      startDate,
      endDate,
    };
  }

  componentDidMount() {
    if (
      this.props.role === "USER" &&
      this.props.user.department === "Recruiter"
    ) {
      const startDate = `${this.state.startDate.format(
        "YYYY-MM-DD"
      )}T20:00:00Z`;
      const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`;
      const { getDateWiseList, recruiterId } = this.props;
      getDateWiseList(recruiterId, startDate, endDate);
    } else {
      const startDate = `${this.state.startDate.format(
        "YYYY-MM-DD"
      )}T20:00:00Z`;
      const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`;
      const { getSalesDateWiseList, orgId } = this.props;
      getSalesDateWiseList(orgId, startDate, endDate);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      if (
        this.props.role === "USER" &&
        this.props.user.department === "Recruiter"
      ) {
        const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
        getDateWiseList(recruiterId, startDate, endDate);
      } else {
        const { getSalesDateWiseList, orgId, startDate, endDate } = nextProps;
        getSalesDateWiseList(orgId, startDate, endDate);
      }
    }
  }
  componentDidMount() {
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`;
    const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`;
    this.props.getJumpInvestorlist(this.props.userId, startDate, endDate);
    this.props.getJumpInvestor2list(this.props.userId, startDate, endDate);
    this.props.getJumpInvestor3list(this.props.userId, startDate, endDate);
    this.props.getJumpInvestor4list(this.props.userId, startDate, endDate);
  }

  render() {
    const { showDatelist, fetchingDatewiseReport } = this.props;
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`;
    return (
      <FlexContainer flexDirection="row" style={{ width: "100%" }}>
        <FlexContainer style={{ width: "100%" }}>
          <JumpStartBox
            noProgress
            title="Pitch Qualified"
            value={this.props.jumpstartInvestorCount.qualifiedInvestorLeadsList}
            isLoading={this.props.user.fetchingJumpstartInvestor}
          />

          <JumpStartBox
            noProgress
            title="Pitch Added"
            value={this.props.jumpstartInvestor2Count.createdinvestorLeadsList}
            isLoading={this.props.fetchingJumpstartInvestor2}
          />

          <JumpStartBox
            noProgress
            title="Deals Added"
            value={this.props.jumpstartInvestor3Count.opportunityAdded}
            isLoading={this.props.fetchingJumpstartInvestor3}
          />
          <JumpStartBox
            noProgress
            title="Deals Closed"
            value={ this.props.jumpstartInvestor4Count.closedOpportunity}
             isLoading={this.props.fetchingJumpstartInvestor4}
          />
        </FlexContainer>
        <Spacer />
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,
    jumpstartInvestorCount: dashboard.jumpstartInvestorCount,
  jumpstartInvestor2Count: dashboard.jumpstartInvestor2Count,
  jumpstartInvestor3Count: dashboard.jumpstartInvestor3Count,
  jumpstartInvestor4Count: dashboard.jumpstartInvestor4Count,
  fetchingJumpstartInvestor: dashboard.fetchingJumpstartInvestor,
  fetchingJumpstartInvestor2: dashboard.fetchingJumpstartInvestor2,
  fetchingJumpstartInvestor3: dashboard.fetchingJumpstartInvestor3,
  fetchingJumpstartInvestor4: dashboard.fetchingJumpstartInvestor4,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDateWiseList,
      getSalesDateWiseList,
      getJumpInvestorlist,
      getJumpInvestor2list,
      getJumpInvestor3list,
      getJumpInvestor4list

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardInvestorsOrgJumpstart);

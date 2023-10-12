import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import {
//   getDateWiseList,
//   getSalesDateWiseList,
//   getJumpBulblist,
//   getJumpBulblist2,
//   getJumpCustomerlist,
//   getJumpCustomerlist2,
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
    // this.props.getJumpBulblist(this.props.userId, startDate, endDate);
    // this.props.getJumpBulblist2(this.props.userId, startDate, endDate);
    // this.props.getJumpCustomerlist(this.props.userId, startDate, endDate);
    // this.props.getJumpCustomerlist2(this.props.userId, startDate, endDate);
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
            // value={this.props.jumpstartBulbCount.qualifiedLeadsList}
            // isLoading={this.props.user.fetchingJumpstartBulb}
          />

          <JumpStartBox
            noProgress
            title="Pitch Added"
            // value={this.props.jumpstartBulb2Count.createdLeadsList}
            // isLoading={this.props.fetchingJumpstartBulb2}
          />

          <JumpStartBox
            noProgress
            title="Deals Added"
            // value={this.props.jumpstrtCUSTOCount.opportunityAdded}
            // isLoading={this.props.fetchingJumpstartCustolist}
          />
          <JumpStartBox
            noProgress
            title="Deals Closed"
            // value={ this.props.jumpstrtCUSTO2Count.closedOpportunity}
            //  isLoading={this.props.fetchingJumpstartCusto2list}
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
  fetchingTaskper: dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  jumpstartBulbCount: dashboard.jumpstartBulbCount,
  jumpstartBulb2Count: dashboard.jumpstartBulb2Count,
  fetchingJumpstartBulb: dashboard.fetchingJumpstartBulb,
  fetchingJumpstartBulb2: dashboard.fetchingJumpstartBulb2,
  jumpstrtCUSTOCount: dashboard.jumpstrtCUSTOCount,
  fetchingJumpstartCustolist: dashboard.fetchingJumpstartCustolist,
  jumpstrtCUSTO2Count: dashboard.jumpstrtCUSTO2Count,
  fetchingJumpstartCusto2list: dashboard.fetchingJumpstartCusto2list,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getDateWiseList,
    //   getSalesDateWiseList,
    //   getJumpBulblist,
    //   getJumpCustomerlist,
    //   getJumpBulblist2,
    //   getJumpCustomerlist2,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardInvestorsOrgJumpstart);

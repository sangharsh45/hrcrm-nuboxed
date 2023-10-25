import React, { lazy, Suspense,useState,useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getLeadQualified} from "../../../DashboardAction";

function LeadQualifiedTable (props) {
    useEffect(()=>{
        props.getLeadQualified(props.userId);
    },[]);

    const columns = [
      {
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        width: "30%",
        dataIndex: "opportunityName",
      },
     
      {
        title: <FormattedMessage
          id="app.proposalvalue"
          defaultMessage="Proposal Value"
        />,
        width: "22%",
        dataIndex: "proposalAmount",
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.proposalAmount - b.proposalAmount,
  
        // render: (name, item, i) => {
        //   return (
        //     <span>
        //       <CurrencySymbol currencyType={this.props.currency} />{" "}
        //       {`${item.proposalAmount}`}
        //     </span>
        //   );
        // },
      },
      {
        // title: "Status",
        title: <FormattedMessage
          id="app.status"
          defaultMessage="Status"
        />,
        width: "25%",
        dataIndex: "stageName",
        // sorter: (a, b) => {
        //   const stageNameA = a.stageName && a.stageName.toLowerCase();
        //   const stageNameB = b.stageName && b.stageName.toLowerCase();
        //   if (stageNameA < stageNameB) {
        //     return -1;
        //   }
        //   if (stageNameA > stageNameB) {
        //     return 1;
        //   }
        //   return 0;
        // },
      },
    ];
  
    return (
      <>
        <StyledTable
          columns={columns}
          dataSource={props.showQualifiedLeads}
          loading={props.fetchingLeadsQualified}
        />
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    showQualifiedLeads:dashboard.showQualifiedLeads,
    userId: auth.userDetails.userId,
    fetchingLeadsQualified:dashboard.fetchingLeadsQualified
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getLeadQualified,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LeadQualifiedTable);
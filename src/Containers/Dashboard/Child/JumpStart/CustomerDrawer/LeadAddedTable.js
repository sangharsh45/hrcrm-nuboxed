import React, { lazy, Suspense,useState,useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getLeadAdded} from "../../../DashboardAction";

function LeadAddedTable (props) {
    useEffect(()=>{
        props.getLeadAdded(props.userId)
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
          dataSource={props.showAddedLeads}
          loading={props.fetchingLeadsAdded}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showAddedLeads:dashboard.showAddedLeads,
        userId: auth.userDetails.userId,
        fetchingLeadsAdded:dashboard.fetchingLeadsAdded
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLeadAdded,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(LeadAddedTable);
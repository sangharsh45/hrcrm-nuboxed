import React, { lazy, Suspense,useState,useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledTable } from "../../Components/UI/Antd";
import {getTaskNameDetails} from "./DashboardAction";

function TaskNameDrawerTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getTaskNameDetails(props.particularTaskName.name,props.userId,props.startDate,props.endDate);
      }
      else {
        props.getTaskNameDetails(props.particularTaskName.name,props.userId,props.startDate,props.endDate);
      }
    }, [props.particularTaskName.name,props.userId,props.startDate,props.endDate]);
    const columns = [
      {
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        width: "30%",
        dataIndex: "name",
      },
     
      {
        title: <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        />,
        width: "22%",
        dataIndex: "email",
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
          id="app.endDate"
          defaultMessage="End Date"
        />,
        width: "25%",
        dataIndex: "companyName",

      },
    ];
  
    return (
      <>
        <StyledTable
          columns={columns}
          dataSource={props.taskInameDrwr}
          loading={props.fetchingTaskNamedrwr}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        taskInameDrwr:dashboard.taskInameDrwr,
        userId: auth.userDetails.userId,
        fetchingTaskNamedrwr:dashboard.fetchingTaskNamedrwr,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskNameDetails,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(TaskNameDrawerTable);
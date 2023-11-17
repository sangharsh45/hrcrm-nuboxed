import React, { lazy, Suspense,useState,useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledTable } from "../../Components/UI/Antd";
import {getTaskNameDetails} from "./DashboardAction";
import moment from "moment";

function TaskNameDrawerTable (props) {
    useEffect(()=>{
      
        props.getTaskNameDetails(props.userId,props.particularTaskName.name,);
    
    }, [props.userId,props.particularTaskName.name]);
    const columns = [
      {
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        width: "30%",
        dataIndex: "taskType",
      },
     
      {
        title: <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        />,
        width: "12%",
        render: (name, item, i) => {
          return (
            <span>
              {` ${moment(item.startDate).format("ll")}`}
            </span>
          );
        },
      },
      {
        // title: "Status",
        title: <FormattedMessage
          id="app.endDate"
          defaultMessage="End Date"
        />,
        width: "12%",
        render: (name, item, i) => {
          return (
            <span>
              {` ${moment(item.endDate).format("ll")}`}
            </span>
          );
        },

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
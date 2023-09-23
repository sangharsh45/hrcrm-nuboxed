
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm, StyledTable } from "../../../../../Components/UI/Antd";
import {getScheduler} from "../../../SettingsAction";
import DeleteIcon from '@mui/icons-material/Delete';

function SchedulerTable(props) {
  

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
     width: "30%",
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      width: "30%",
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <StyledPopconfirm
            title="Do you want to delete?"
          >
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red" }} />
          </StyledPopconfirm>
        );
      },
    },
  ]
  useEffect(()=>{
   // props.getScheduler(props.organizationId)
},[])
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.scheduler}
        // loading={
        //   props.fetchingScheduler ||
        //   props.fetchingSchedulerError
        // }
        pagination={false}
        scroll={{ y: 240 }}
        onChange={console.log("task onChangeHere...")}
      />
      
    </>
  );
}

const mapStateToProps = ({  auth,settings }) => ({
    // organizationId: auth.userDetails.organizationId,
    // scheduler: settings.scheduler,   
    // fetchingScheduler: settings.fetchingScheduler,
    // fetchingSchedulerError: settings.fetchingSchedulerError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {   
        
    },
    dispatch
  );

export default connect(
  
)(SchedulerTable);

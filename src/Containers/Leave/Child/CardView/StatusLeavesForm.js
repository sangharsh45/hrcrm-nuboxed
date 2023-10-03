import React,{useEffect} from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getApprovedStatusByTaskId } from "../../LeavesAction"

const StatusLeavesForm = (props) => {
  useEffect(() => {
    props.getApprovedStatusByTaskId(props.taskId);
   
  }, []);
  <Timeline
    items={[
      {
        children: 'Create a services site 2015-09-01',
      },
      {
        children: 'Solve initial network problems 2015-09-01',
      },
      {
        dot: <ClockCircleOutlined className="timeline-clock-icon" style={{color:"red"}} />,
        color: 'red',
        children: 'Technical testing 2015-09-01',
      },
      {
        children: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
  };

const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  approveStatus:leave.approveStatus,
})

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getApprovedStatusByTaskId
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(StatusLeavesForm)

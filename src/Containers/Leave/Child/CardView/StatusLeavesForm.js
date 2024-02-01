import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLeaveStatusByLeaveId } from '../../LeavesAction';
import dayjs from 'dayjs';

const StatusLeavesForm = (props) => {
  useEffect(() => {
    props.getLeaveStatusByLeaveId(props.leaveId);
  }, []);

  const { leaveStatus, ratingValue } = props;

  return (
    <>
      <div className="mt-4">
        <Timeline>
          {leaveStatus &&
            leaveStatus.map((status, i) => (
              <Timeline.Item key={i}>
                 {status.approvedStatus === 'Approved' ? (
                  ` ${dayjs(status.createdOn).format("DD-MM-YYYY")} Approved By ${status.employeeName} on ${dayjs(status.approvedDate).format("DD-MM-YYYY")}`
                ) : status.approvedStatus === 'Pending' ? (
                  `Pending With ${status.employeeName}.`
                ) : null}
              </Timeline.Item>
            ))}
          {/* <Timeline.Item
            dot={<ClockCircleOutlined className="timeline-clock-icon" style={{ color: 'red' }} />}
            color="red"
          >
            Technical testing 2015-09-01
          </Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
        </Timeline>
      </div>
    </>
  );
};

const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  leaveStatus: leave.leaveStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveStatusByLeaveId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StatusLeavesForm);









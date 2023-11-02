import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {getpichTimeline} from "../PitchAction";

const PitchTimeline = (props) => {
  useEffect(() => {
    props.getpichTimeline(props.rowdata.investorLeadsId);
  }, []);

  const { pitchStatus, ratingValue } = props;
  console.log(props.rowdata.investorLeadsId)
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {pitchStatus &&
            pitchStatus.map((status, i) => (
              <Timeline.Item key={i}>
             {status.employeeName}
                 
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </>
  );
};

const mapStateToProps = ({ mileage, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  pitchStatus:pitch.pitchStatus,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getpichTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchTimeline);


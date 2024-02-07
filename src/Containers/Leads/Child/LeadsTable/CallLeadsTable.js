


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
 import { getCallTimeline } from '../../LeadsAction';

const CallLeadsTable = (props) => {
  useEffect(() => {
      props.getCallTimeline(props.rowdata.leadsId);
  }, []);

  const { callTimeline, ratingValue } = props;
  return (
    <>
        <div className="mt-4">
        <Timeline>
          {callTimeline &&
            callTimeline.map((status, i) => (
              <Timeline.Item key={i}>
                <div>
                <div>{status.category} - {status.activityType} on {dayjs(status.endDate).format('DD/MM/YYYY')}</div>
           
                </div>
                <div>
                
                 
                 
                </div>
              </Timeline.Item>
       
            ))}
        </Timeline>
        
      </div>
    </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  userId: auth.userDetails.userId,
  callTimeline: leads.callTimeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);























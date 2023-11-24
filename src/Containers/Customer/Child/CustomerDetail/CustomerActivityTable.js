


import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getCustomerActivityTimeline } from '../../CustomerAction';

const CustomerActivityTable = (props) => {
  useEffect(() => {
      props.getCustomerActivityTimeline(props.customer.customerId);
  }, []);

  const { customerActivityTimeline, ratingValue } = props;
  return (
    <>
        <div className="mt-4">
        <Timeline>
          {customerActivityTimeline &&
            customerActivityTimeline.map((status, i) => (
              <Timeline.Item key={i}>
                <div>
                <div>
                  {status.category} {status.activityType} {moment.utc(status.startDate).format('ll')}
                  </div>
           
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

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  customerActivityTimeline: customer.customerActivityTimeline,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerActivityTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActivityTable);



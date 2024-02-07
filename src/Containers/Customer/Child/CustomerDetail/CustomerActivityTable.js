


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
 import { getCustomerActivityTimeline } from '../../CustomerAction';

const CustomerActivityTable = (props) => {
  useEffect(() => {
      props.getCustomerActivityTimeline(props.customer.customerId);
  }, []);

  const { customerActivityTimeline, ratingValue } = props;
  return (
    <>
        <div className="mt-4 ml-4">
        <Timeline>
          {customerActivityTimeline &&
            customerActivityTimeline.map((status, i) => (
              <Timeline.Item key={i}>
                <div>
                <div>
                  {status.category} {status.activityType} Completed by {dayjs(status.endDate).format('DD/MM/YYYY')}
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



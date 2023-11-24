import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {getContactInvestTimeline} from "../../../ContactInvestAction";

const ContactInvestTimeline = (props) => {
  useEffect(() => {
    props.getContactInvestTimeline(props.contactInVestDetail.contactId);
  }, []);

  const { contactInvestStatus, ratingValue } = props;
  console.log(props.contactInVestDetail.investorLeadsId)
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {contactInvestStatus &&
            contactInvestStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div>
              <div>{status.category} {status.activityType} {moment.utc(status.startDate).format('ll')}</div>
         
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

const mapStateToProps = ({ mileage,contactinvest, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  contactInvestStatus:contactinvest.contactInvestStatus,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactInvestTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestTimeline);


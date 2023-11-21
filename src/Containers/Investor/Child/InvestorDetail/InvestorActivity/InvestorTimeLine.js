import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {getInvestorTimeline} from "../../../InvestorAction";

const InvestorTimeline = (props) => {
  useEffect(() => {
    // props.getInvestorTimeline(props.investorDetails.contactId);
  }, []);

  const { InvestorStatus, ratingValue } = props;
  console.log(props.investorDetails.investorLeadsId)
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {InvestorStatus &&
            InvestorStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div>
              <div>{status.category} {status.activityType} {moment((status.startdate, 'YYYY-MM-DD')).format('YYYY-MM-DD')}</div>
         
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

const mapStateToProps = ({ mileage,investor, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  InvestorStatus:investor.InvestorStatus,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getInvestorTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTimeline);


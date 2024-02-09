import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import {getInvestorTimeline} from "../../../InvestorAction";

const InvestorTimeline = (props) => {
  useEffect(() => {
     props.getInvestorTimeline(props.investorDetails.investorId);
  }, []);

  const { InvestorStatus, ratingValue } = props;
  console.log(props.investorDetails.investorId)
  return (
    <>
      <div className="mt-4 ml-2">
        <Timeline>
          {InvestorStatus &&
            InvestorStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div>
              <div>{status.category} {status.activityType} {dayjs(status.endDate).format('DD/MM/YYYY')}</div>
         
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


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getCallTimeline } from '../../LeadsAction';
import { Tooltip } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";

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
                <div>{status.category} - {status.activityType} on {dayjs(status.startDate).format('DD/MM/YYYY')} - {status.woner !==props.fullName ?  <Tooltip title={status.woner}> 
                            <MultiAvatar
                              primaryTitle={status.woner}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            </Tooltip>:null}  </div>
           
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
  fullName:auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);























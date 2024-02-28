import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getContactCETimeline } from '../../ContactAction';
import { Tooltip } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";

const ContactCETcard = (props) => {
  useEffect(() => {
      props.getContactCETimeline(props.currentContact.contactId);
  }, []);

  const { contactCETimeline, ratingValue } = props;
  return (
    <>
        <div className="mt-4">
        <Timeline>
          {contactCETimeline &&
            contactCETimeline.map((status, i) => (
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

const mapStateToProps = ({ contact, auth }) => ({
  userId: auth.userDetails.userId,
  contactCETimeline: contact.contactCETimeline,
  fullName:auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactCETimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactCETcard);























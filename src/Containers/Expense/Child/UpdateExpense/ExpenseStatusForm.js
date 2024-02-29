
import React,{useEffect} from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs';
 import {getExpenseStatusByExpenseId } from "../../ExpenseAction"

const ExpenseStatusForm = (props) => {
  useEffect(() => {
    props.getExpenseStatusByExpenseId(props.voucherId);
   
  }, []);
  const { expenseStatus, ratingValue } = props;
  return (
    <>
    <div class=" mt-4">
        <Timeline>
          {expenseStatus &&
            expenseStatus.map((status, i) => (
              <Timeline.Item key={i}>
              {`${status.approvedStatus} by ${status.employeeName}`}
              <br />
              {status.createdOn ? (
                `Sent on ${dayjs(status.createdOn).format("DD-MM-YYYY")}`
              ) : (
                "Yet to be approved"
              )}
               ||
              &nbsp;&nbsp;
              {status.approvedDate ? (
                `Approved on ${dayjs(status.approvedDate).format("DD-MM-YYYY")}`
              ) : (
                "Yet to be approved"
              )}
              
                          
                          </Timeline.Item>
              // <Timeline.Item key={i}>
              //     {status.approvedStatus === 'Approved' ? (
              //     ` ${dayjs(status.createdOn).format('DD/MM/YYYY')} Approved By ${status.employeeName} on ${dayjs(status.approvedDate).format('DD/MM/YYYY')}`
              //   ) : status.approvedStatus === 'Pending' ? (
              //     `Pending With ${status.employeeName}.`
              //   ) : null}
              // </Timeline.Item>
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

const mapStateToProps = ({ expense, auth }) => ({
  userId: auth.userDetails.userId,
  expenseStatus:expense.expenseStatus,
})

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getExpenseStatusByExpenseId
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseStatusForm)

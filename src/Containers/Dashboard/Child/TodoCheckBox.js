import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateTodoEvent, updateTodoCall,updateTodoTask } from "../DashboardAction"

function TodoCheckBox(props) {
    const { todo, } = props;
    console.log("tenth",todo)

    const [toggle, setToggle] = React.useState(todo.completionInd)

    function handleToggleCollection() {
        // setPaymentCollection(!paymentCollection);
        if (todo.completionInd&&todo.activity==="Call") {
            props.updateTodoCall(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd: todo.completionInd ? false : true,
                    rating:props.ratingValue
                },
                todo.callId,
                todo.activity
                // props.candidateId,
                // props.userId,
                //  handleCallbackFalse
            );
        } else  {
            props.updateTodoCall(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    rating:props.ratingValue,
                    complitionInd: todo.completionInd ? false : true
                },
                todo.callId,
                todo.activity
                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }

        if (todo.completionInd&&todo.activity==="Event") {
            props.updateTodoEvent(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd: todo.completionInd ? false : true,
                    rating:props.ratingValue
                },
                 todo.eventId,
                 todo.activity
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.updateTodoEvent(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    complitionInd: todo.completionInd ? false : true,
                    rating:props.ratingValue
                },
                todo.eventId,
                todo.activity,
                

                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }

        if (todo.completionInd&&todo.activity==="Task") {
            props.updateTodoTask(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // status: true,
                    complitionInd: todo.completionInd ? false : true,
                    rating:props.ratingValue
                },
                 todo.taskId,
                 todo.activity
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.updateTodoTask(
                {
                    // candidateId: props.candidateId,
                    // userId: props.userId,
                    // // status: true,
                    complitionInd: todo.completionInd ? false : true,
                    rating:props.ratingValue
                },
                todo.taskId,
                todo.activity,
                

                // props.candidateId,
                // props.userId,
                //  handleCallback
            );
        }
    }

    // function handleCancel() {
    //     if (props.active) {
    //         setToggle(true);
    //     } else {
    //         setToggle(false);
    //     }
    // }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={ handleToggleCollection}
                    // onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Checkbox
                        checked={todo.completionInd || toggle}
                        // disabled={props.status}
                        // isLoading={true}
                        // checkedChildren="Yes"
                        // unCheckedChildren="No"
                     
                    />
                   
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, candidate }) => ({
    // userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // linkCandidateStatus,
            updateTodoCall,
            updateTodoEvent,
            updateTodoTask
            // getCandidateListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(TodoCheckBox);

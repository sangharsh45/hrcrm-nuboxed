import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkTaskStatus } from "../TaskAction"

function TaskStatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.completionInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.active) {
            props.linkTaskStatus(
                {
                  
                    completionInd: props.completionInd ? false : true,
                },
                props.taskId,
                // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.linkTaskStatus(
                {
                  
                    
                    completionInd: props.completionInd ? false : true,
                },
                props.taskId,
                
                //  handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.completionInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                 onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Switch className="toggle-clr"
                        checked={props.completionInd || toggle}
                        // disabled={props.status}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
                   
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, candidate }) => ({
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkTaskStatus
            // linkCandidateStatus,
            // getCandidateListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(TaskStatusToggle);

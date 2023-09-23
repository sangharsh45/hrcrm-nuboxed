import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkSummaryStatus, 
     publishSummaryStatus 
} from "../../../../../OpportunityAction"

function PublishToggle(props) {

    const [toggle, setToggle] = React.useState(props.publishInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.publishInd) {
            props.linkSummaryStatus(
                {
                    candidateId: props.candidateId,
                    userId: props.userId,
                    // status: true,
                    active: props.active ? false : true,
                },
                props.candidateId,
                props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.publishSummaryStatus(
                {
                    candidateId: props.candidateId,
                    userId: props.userId,
                    // status: true,
                    active: props.active ? false : true,
                },
                props.candidateId,
                props.userId,
                //  handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.active) {
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
                    // onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Switch className="toggle-clr"
                         checked={props.publishInd || toggle}
                        // disabled={props.status}
                        isLoading={true}
                        checkedChildren="Publish"
                        unCheckedChildren="Unpublish"
                     
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
            linkSummaryStatus,
            publishSummaryStatus
            // publishSummaryStatus
            // linkCandidateStatus,
            // getCandidateListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(PublishToggle);

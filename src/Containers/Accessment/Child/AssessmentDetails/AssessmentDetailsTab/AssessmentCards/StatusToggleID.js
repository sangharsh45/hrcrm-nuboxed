import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { publishIndicatorAssessmentId } from "../../../../AccessmentAction";

function StatusToggleID(props) {
    const {
        assessmentByAssessmentId: { assessmentName, publishInd, assessmentId },
        toggleViewType,
        assessmentByAssessmentId,
      } = props;
    const [toggle, setToggle] = React.useState(props.publishInd)

    function handleToggleCollection() {
        // setPaymentCollection(!paymentCollection);
        if (props.assessmentByAssessmentId.publishInd) {
            props.publishIndicatorAssessmentId(
                {
                    assessmentId: props.assessmentByAssessmentId.assessmentId,
                    // serviceId:props..serviceId,
                   // userId: props.userId,
                    // status: true,
                    publishInd: props.assessmentByAssessmentId.publishInd ? false : true,
                },
                props.assessmentByAssessmentId.assessmentId,
                // props..serviceId
          
            );
        } else {
            props.publishIndicatorAssessmentId(
                {
                     // serviceId:props..serviceId,
                    assessmentId: props.assessmentByAssessmentId.assessmentId,
                    publishInd: props.assessmentByAssessmentId.publishInd ? false : true,
                },
                props.assessmentByAssessmentId.assessmentId,
                // props..serviceId
               
            );
        }
    }

    function handleCancel() {
        if (props.assessmentByAssessmentId.publishInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    // function handleCallback() {
    //     window.location.reload();
    // }

    console.log(props.assessmentByAssessmentId.assessmentId);
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
                        checked={props.assessmentByAssessmentId.publishInd || toggle}
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

const mapStateToProps = ({  }) => ({
    
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            publishIndicatorAssessmentId
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(StatusToggleID);

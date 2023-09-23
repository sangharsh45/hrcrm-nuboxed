import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { publishIndicatorAssessment } from "../../AccessmentAction";

function StatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.publishInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.publishInd) {
            props.publishIndicatorAssessment(
                {
                    assessmentId: props.item.assessmentId,
                    // serviceId:props.item.serviceId,
                   // userId: props.userId,
                    // status: true,
                    publishInd: props.publishInd ? false : true,
                },
                props.item.assessmentId,
                // props.item.serviceId
          
            );
        } else {
            props.publishIndicatorAssessment(
                {
                     // serviceId:props.item.serviceId,
                    assessmentId: props.item.assessmentId,
                    publishInd: props.publishInd ? false : true,
                },
                props.item.assessmentId,
                // props.item.serviceId
               
            );
        }
    }

    function handleCancel() {
        if (props.publishInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    // function handleCallback() {
    //     window.location.reload();
    // }

    console.log(props.assessmentId);
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

const mapStateToProps = ({ auth,assessment }) => ({
    assessment:assessment.assessment,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            publishIndicatorAssessment
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(StatusToggle);

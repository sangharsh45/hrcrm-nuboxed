import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getEmployeelist,linkEmployeeDefult} from "../../../../../EmployeeAction";

function DefultToggle(props) {

    const [toggle, setToggle] = React.useState(props.defaultInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.defaultInd) {
            props.linkEmployeeDefult(
                {
                    id: props.id,
                   // userId: props.userId,
                    // status: true,
                    defaultInd: props.defaultInd ? false : true,
                },
                props.id,
               // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.linkEmployeeDefult(
                {
                    id: props.id,
                   // userId: props.userId,
                    // status: true,
                    defaultInd: props.defaultInd ? false : true,
                },
                props.id,
                props.userId,
                //  handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.defaultInd) {
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
                        checked={props.defaultInd || toggle}
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

const mapStateToProps = ({ auth,profile, employee }) => ({
    userId: auth.userDetails.userId,    
    bank: profile.bankDetails,
  fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
        getEmployeelist,
        linkEmployeeDefult,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DefultToggle);

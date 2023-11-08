import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    linkDistributorPaymentByFinance
} from "../../CollectionAction";

function DistributorPaymentToggle(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false)

    function handleToggleCollection(item) {
        props.linkDistributorPaymentByFinance(
            {
                paymentId: props.paymentId,
                userId: props.userId
            },
            props.paymentId,
            props.userId,
        );
    }

    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm received"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                        checked={props.paymentCollection || paymentCollection}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, collection }) => ({
    fetchingTodayDistributor: collection.fetchingTodayDistributor,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkDistributorPaymentByFinance
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DistributorPaymentToggle);

import React from "react";
import { Switch,  Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { approveSpare } from "./RefurbishAction";

function DistributorPaymentToggle(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false)

    function handleToggleCollection(item) {
        props.approveSpare(
            {
                approveSpareInd: true,
                status:"approved"
            },
            props.phoneSpareId,  
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

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            approveSpare
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DistributorPaymentToggle);

import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToMaterial } from "../../ProductAction";

class AddToSuppliesToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };
    }

    onChange = (checked) => {
        this.setState({ toggle: true });
        this.props.addToMaterial({
            userId: this.props.userId,
        },
            this.props.item.productId,
            this.props.groupId
        );
    };

    render() {
        const { user } = this.props;
        return (
            <>
                <div>
                    <Popconfirm
                        title="Do you want to transfer to catalogue ?"
                        onConfirm={() => {
                            this.onChange();
                        }}
                        onCancel={null}
                        okText="Ok"
                        cancelText="Cancel"
                    >

                        <Switch
                            checked={this.props.item.catalogInd}
                            disabled={this.props.item.catalogInd}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </Popconfirm>
                </div>
            </>
        );
    }
}
const mapStateToProps = ({ auth, order }) => ({
    groupId: auth.userDetails.groupId,
    userId: auth.userDetails.userId,
    // user: auth.userDetails,
    // projectDetailsId: order.orderData.projectDetailsId,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addToMaterial
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AddToSuppliesToggle);

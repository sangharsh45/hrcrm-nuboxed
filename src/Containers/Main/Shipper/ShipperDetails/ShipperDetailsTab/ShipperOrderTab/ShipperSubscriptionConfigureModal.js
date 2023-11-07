import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { Radio } from "antd";
import SubscriptionForm from "../../ShipperDetailsTab/ShipperOrderTab/SubscriptionForm";
import OneTimeSubscriptionForm from "../../ShipperDetailsTab/ShipperOrderTab/OneTimeSubscriptionForm";

class ShipperSubscriptionConfigureModal extends Component {
    render() {
        const {
            addShipperSubscriptionConfigureModal,
            handleShipperSubscriptionConfigureModal,
        } = this.props;
        return (
            <div>
                <StyledModal
                    title=" Order Configure"
                    width="45vw"
                    visible={addShipperSubscriptionConfigureModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 300 }}
                    onCancel={() => handleShipperSubscriptionConfigureModal(false)}
                    footer={null}
                >
                    <Radio.Group onChange={this.props.onChange} value={this.props.value}>
                        <Radio value={1}>Subscription</Radio>
                        <Radio value={2}>One Time</Radio>
                    </Radio.Group>
                    {this.props.value === 1 ? (
                        <SubscriptionForm
                            handleGenerateOrderInShipper={this.props.handleGenerateOrderInShipper}
                            onChangeCustom={this.props.onChangeCustom}
                            dailyCustomInd={this.props.dailyCustomInd}
                        />
                    ) : (
                            <OneTimeSubscriptionForm handleGenerateOrderInShipper={this.props.handleGenerateOrderInShipper} />
                        )}
                </StyledModal>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipperSubscriptionConfigureModal);

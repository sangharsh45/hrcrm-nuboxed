import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getFeedbackByOrderId } from "../../../../ShipperAction";
import NoteFormForFeedBack from "../../../../../Note/NoteFormForFeedBack";
import SingleFeedback from "../../../../../../Components/Common/SingleFeedback";

class ShipperOrderFeedback extends Component {
    componentDidMount() {
        this.props.getFeedbackByOrderId(this.props.orderId);
    }

    render() {
        const { fetchingFeedbackByOrderId, orderFeedbacks } = this.props;

        return (
            <>
                <FlexContainer justifyContent="space-between">
                    <div style={{ width: "49%", marginTop: "2px", marginLeft: "2px" }}>
                        <NoteFormForFeedBack
                            type={"shipper"}
                            orderId={this.props.orderId}
                            // userId={this.props.userId}
                            callback={() =>
                                this.props.getFeedbackByOrderId(this.props.orderId)
                            }
                        />
                    </div>
                    <div style={{ width: "50%", padding: "2px" }}>
                        <BorderBox>
                            <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                                {fetchingFeedbackByOrderId ? (
                                    <BundleLoader />
                                ) : (
                                        <Timeline>
                                            {orderFeedbacks &&
                                                orderFeedbacks.map((item, index) => (
                                                    <Timeline.Item
                                                        key={index}
                                                        style={{ paddingBottom: "10px" }}
                                                    >
                                                        <SingleFeedback {...item} orderId={this.props.orderId} />
                                                    </Timeline.Item>
                                                ))}
                                        </Timeline>
                                    )}
                            </div>
                        </BorderBox>
                    </div>
                </FlexContainer>
                <br />
            </>
        );
    }
}

const mapStateToProps = ({ auth, shipper }) => ({
    userId: auth.userDetails.userId,
    orderFeedbacks: shipper.orderFeedbacks,
    fetchingFeedbackByOrderId: shipper.fetchingFeedbackByOrderId,
    shipperId: shipper.shipperDetailsByshipperId.shipperId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getFeedbackByOrderId,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipperOrderFeedback);

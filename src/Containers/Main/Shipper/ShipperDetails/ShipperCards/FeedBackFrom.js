import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getFeedbackByShipperId } from "../../ShipperAction";
import NoteFormForFeedBack from "../../../../Note/NoteFormForFeedBack";
import SingleFeedback from "../../../../../Components/Common/SingleFeedback.js";

class FeedBackFrom extends Component {
    componentDidMount() {
        this.props.getFeedbackByShipperId(this.props.shipperId);
    }

    render() {
        const { fetchingFeedbackByShipperId, feedbacks } = this.props;

        return (
            <>
                <FlexContainer justifyContent="space-between">
                    <div style={{ width: "49%", marginTop: "2px", marginLeft: "2px" }}>
                        <NoteFormForFeedBack
                            type={"Shipper"}
                            shipperId={this.props.shipperId}
                            // userId={this.props.userId}
                            s callback={() =>
                                this.props.getFeedbackByShipperId(this.props.shipperId)
                            }
                        />
                    </div>
                    <div style={{ width: "50%", padding: "2px" }}>
                        <BorderBox>
                            <div style={{ height: 337, overflow: "auto", padding: "0.3rem" }}>
                                {fetchingFeedbackByShipperId ? (
                                    <BundleLoader />
                                ) : (
                                        <Timeline>
                                            {feedbacks &&
                                                feedbacks.map((item, index) => (
                                                    <Timeline.Item
                                                        key={index}
                                                        style={{ paddingBottom: "10px" }}
                                                    >
                                                        <SingleFeedback {...item} userId={this.props.userId} />
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
    feedbacks: shipper.feedbacks,
    fetchingFeedbackByShipperId: shipper.fetchingFeedbackByShipperId,
    shipperId: shipper.shipperDetailsByShipperId.shipperId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getFeedbackByShipperId,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedBackFrom);

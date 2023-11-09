import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getNotesListByShipperId } from "../../../ShipperAction";
import ShipperNoteForm from "./ShipperNoteForm";
import { SingleNote } from "../../../../../../Components/Common";

class LinkedShipperNotes extends Component {
    componentDidMount() {
        this.props.getNotesListByShipperId(this.props.shipperShipperId);
    }

    render() {
        const { fetchingNotesListByShipperId, notesListByShipperId } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    <ShipperNoteForm
                        type={"shipper"}
                        shipperId={this.props.shipperShipperId}
                        callback={() =>
                            this.props.getNotesListByShipperId(this.props.shipperShipperId)
                        }
                    />
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingNotesListByShipperId ? (
                            <BundleLoader />
                        ) : (
                                <Timeline>
                                    {notesListByShipperId &&
                                        notesListByShipperId.map((item, index) => (
                                            <Timeline.Item
                                                key={index}
                                                style={{ paddingBottom: "10px" }}
                                            >
                                                <SingleNote {...item} userId={this.props.userId} />
                                            </Timeline.Item>
                                        ))}
                                </Timeline>
                            )}
                    </div>
                </BorderBox>
            </>
        );
    }
}

const mapStateToProps = ({ auth, shipper }) => ({
    userId: auth.userDetails.userId,
    notesListByShipperId: shipper.notesListByShipperId,
    fetchingNotesListByShipperId: shipper.fetchingNotesListByShipperId,
    shipperShipperId: shipper.shipperDetailsByShipperId.shipperId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNotesListByShipperId,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkedShipperNotes);

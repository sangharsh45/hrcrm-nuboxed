import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
// import { getOrderPhoneNote } from "../../../../Distributor/DistributorAction";

import { SingleNote } from "../../../../../../Components/Common";
import NoteForm from "../../../../../Note/NoteForm";

class ReceivedOrderIdPhoneNoteForm extends Component {
    componentDidMount() {
        // this.props.getOrderPhoneNote(this.props.particularRowData.phoneId);
    }

    render() {
        const { fetchingPhoNotesOrder, phoNotesOrder } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    {/* <NoteForm
                        type={"inventory"}
                        phoneId={this.props.particularRowData.phoneId}
                        callback={() =>
                            this.props.getOrderPhoneNote(this.props.particularRowData.phoneId)
                        }
                    /> */}
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingPhoNotesOrder ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {phoNotesOrder &&
                                    phoNotesOrder.map((item, index) => (
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

const mapStateToProps = ({ auth, distributor }) => ({
    userId: auth.userDetails.userId,
    phoNotesOrder: distributor.phoNotesOrder,
    fetchingPhoNotesOrder: distributor.fetchingPhoNotesOrder,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getOrderPhoneNote,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceivedOrderIdPhoneNoteForm);

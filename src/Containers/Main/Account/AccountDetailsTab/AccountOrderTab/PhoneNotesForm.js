import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
// import { getNotesInOrder } from "../../AccountAction";
import NoteForm from "../../../../Note/NoteForm";
import { SingleNote } from "../../../../../Components/Common";

class PhoneNotesForm extends Component {
    // componentDidMount() {
    //     this.props.getNotesInOrder(this.props.particularRowData.orderId);
    // }

    render() {
        const { fetchingNotesInOrders, notesInOrders } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    <NoteForm
                        type={"distributor"}
                        orderId={this.props.RowData.orderId}
                    // callback={() =>
                    //     this.props.getNotesInOrder(this.props.particularRowData.orderId)
                    // }
                    />
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingNotesInOrders ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {notesInOrders &&
                                    notesInOrders.map((item, index) => (
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
    notesInOrders: distributor.notesInOrders,
    fetchingNotesInOrders: distributor.fetchingNotesInOrders,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getNotesInOrder,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneNotesForm);

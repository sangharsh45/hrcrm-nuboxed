import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getLeaveNotes } from "../../LeavesAction";
import LeaveNoteForm from "./LeaveNoteForm";
import { SingleNote } from "../../../../Components/Common";

class LeaveNote extends Component {
    componentDidMount() {
        this.props.getLeaveNotes(this.props.leavesItems.leaveId);
    }

    render() {
        const { fetchingLeavesNotes, leavesNotes,leavesItems } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    <LeaveNoteForm
                        type={"leave"}
                        leaveId={this.props.leavesItems.leaveId}
                        callback={() =>
                            this.props.getLeaveNotes(leavesItems.leaveId)
                        }
                    />
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingLeavesNotes ? (
                            <BundleLoader />
                        ) : (
                                <Timeline>
                                    {leavesNotes &&
                                        leavesNotes.map((item, index) => (
                                            <Timeline.Item
                                                key={index}
                                                style={{ paddingBottom: "10px" }}
                                            >
                                                <SingleNote {...item} userId={this.props.userId}/>
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

const mapStateToProps = ({ auth, leave }) => ({
    userId: auth.userDetails.userId,
    leavesNotes: leave.leavesNotes,
    fetchingLeavesNotes: leave.fetchingLeavesNotes,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getLeaveNotes,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaveNote);

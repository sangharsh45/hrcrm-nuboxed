import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getNotesListByDistributorId } from "../../AccountAction";
import NoteForm from "../../../../Note/NoteForm";
import { SingleNote } from "../../../../../Components/Common";

class LinkedDistributorNotes extends Component {
    componentDidMount() {
        this.props.getNotesListByDistributorId(this.props.distributorDistributorId);
    }

    render() {
        const { fetchingNotesListByDistributorId, notesListByDistributorId } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    <NoteForm
                        type={"distributor"}
                        distributorId={this.props.distributorDistributorId}
                        callback={() =>
                            this.props.getNotesListByDistributorId(this.props.distributorDistributorId)
                        }
                    />
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingNotesListByDistributorId ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {notesListByDistributorId &&
                                    notesListByDistributorId.map((item, index) => (
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
    notesListByDistributorId: distributor.notesListByDistributorId,
    fetchingNotesListByDistributorId: distributor.fetchingNotesListByDistributorId,
    distributorDistributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNotesListByDistributorId,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkedDistributorNotes);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import { getMileageNotes } from "../MileageAction";
import MileageNoteForm from "./MileageNoteForm";
import { SingleNote } from "../../../Components/Common";

class MileageNote extends Component {
    componentDidMount() {
        this.props.getMileageNotes(this.props.milaegeItems.mileageId);
    }

    render() {
        const { fetchingMileagesNotes, mileageNotes,milaegeItems } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    <MileageNoteForm
                        type={"mileage"}
                        mileageId={this.props.milaegeItems.mileageId}
                        callback={() =>
                            this.props.getMileageNotes(milaegeItems.mileageId)
                        }
                    />
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingMileagesNotes ? (
                            <BundleLoader />
                        ) : (
                                <Timeline>
                                    {mileageNotes &&
                                        mileageNotes.map((item, index) => (
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

const mapStateToProps = ({ auth, mileage }) => ({
    userId: auth.userDetails.userId,
    mileageNotes: mileage.mileageNotes,
    fetchingMileagesNotes: mileage.fetchingMileagesNotes,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMileageNotes,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MileageNote);

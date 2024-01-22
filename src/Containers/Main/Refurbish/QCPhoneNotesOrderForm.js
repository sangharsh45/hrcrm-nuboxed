import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import { getOrderPhoneNote } from "../Account/AccountAction";
import NoteForm from "../../Note/NoteForm";
import { SingleNote } from "../../../Components/Common";

class QCPhoneNotesOrderForm extends Component {
    componentDidMount() {
        this.props.getOrderPhoneNote(this.props.RowData.phoneId);
    }

    render() {
        const { fetchingPhoNotesOrder, phoNotesOrder } = this.props;

        return (
            <>
                <div class="bg-[#dcdcdc]">
                    <NoteForm
                        type={"production"}
                        phoneId={this.props.RowData.phoneId}
                        callback={() =>
                            this.props.getOrderPhoneNote(this.props.RowData.phoneId)
                        }
                    />
                </div>
                <br />

                <BorderBox>
                    <div class="h-[200px] overflow-auto p-[0.3rem]">
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
            getOrderPhoneNote,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QCPhoneNotesOrderForm);

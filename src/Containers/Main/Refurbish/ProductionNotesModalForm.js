import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import { getProductionNotesInOrder } from "./RefurbishAction";
// import NoteForm from "../Note/NoteForm";
// import { SingleNote } from "../../Components/Common";

class ProductionNotesModalForm extends Component {
    componentDidMount() {
        this.props.getProductionNotesInOrder(this.props.rowData.orderPhoneId);
    }

    render() {
        const { fetchingProductionNotesInOrders, notesProdInOrders } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                    {/* <NoteForm
                        type={"production"}
                        orderPhoneId={this.props.rowData.orderPhoneId}
                        callback={() =>
                            this.props.getProductionNotesInOrder(this.props.rowData.orderPhoneId)
                        }
                    /> */}
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingProductionNotesInOrders ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {notesProdInOrders &&
                                    notesProdInOrders.map((item, index) => (
                                        <Timeline.Item
                                            key={index}
                                            style={{ paddingBottom: "10px" }}
                                        >
                                            {/* <SingleNote {...item} userId={this.props.userId} /> */}
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

const mapStateToProps = ({ auth, production }) => ({
    userId: auth.userDetails.userId,
    notesProdInOrders: production.notesProdInOrders,
    fetchingProductionNotesInOrders: production.fetchingProductionNotesInOrders,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionNotesInOrder,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionNotesModalForm);

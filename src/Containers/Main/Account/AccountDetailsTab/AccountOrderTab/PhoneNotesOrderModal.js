import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const PhoneNotesForm = lazy(() => import("./PhoneNotesForm"));

const PhoneNotesOrderModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Notes`}
                width="35vw"
                visible={props.phoNotesOrderModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handlePhoneNotesOrderModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <PhoneNotesForm RowData={props.RowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );


}
const mapStateToProps = ({ }) => ({


});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneNotesOrderModal);


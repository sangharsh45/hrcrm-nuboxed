import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BuilderWithPartIdTable from "../../../Refurbish/BuilderWithPartIdTable";

const TaggedBuilderListModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Tagged Parts- ${props.row.productManufacturingId}`}
                width="60vw"
                visible={props.showProductBuilderList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleProductBuilderInProcess(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <BuilderWithPartIdTable row={props.row} />
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
)(TaggedBuilderListModal);


import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import OrderCatalogueList from "./OrderCatalogueList";
import InspectedPhoneByOrder from "./InspectedPhoneByOrder";

const ShowProductBuilderModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Order No-${props.rowData.newOrderNo}`}
                width="60vw"
                visible={props.productBuilderList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ marginTop:"3rem" }}
                onClose={() => props.handleProductBuilder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <InspectedPhoneByOrder rowData={props.rowData} />
                    {/* <OrderCatalogueList rowData={props.rowData} /> */}
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
)(ShowProductBuilderModal);


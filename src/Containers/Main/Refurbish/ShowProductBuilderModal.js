import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductBuilderList from "./ProductBuilderList";
import OrderCatalogueList from "./OrderCatalogueList";

const ShowProductBuilderModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Catalogue`}
                width="60vw"
                visible={props.productBuilderList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleProductBuilder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <ProductBuilderList /> */}
                    <OrderCatalogueList rowData={props.rowData} />
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


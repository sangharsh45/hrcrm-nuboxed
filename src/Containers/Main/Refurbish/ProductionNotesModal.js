import React, { lazy, Suspense,useEffect } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionNotesModalForm from "./ProductionNotesModalForm";

const ProductionNotesModal = (props) => {
    const { rowData,getNotesInOrder,...formProps } = props;
    return (
        <>
            <StyledModal
                title={`Notes`}
                width="35vw"
                visible={props.productioNoteModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handleProductionNotesModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ProductionNotesModalForm rowData={rowData} />
                </Suspense>
            </StyledModal>
        </>
    );


}
  
  export default ProductionNotesModal;


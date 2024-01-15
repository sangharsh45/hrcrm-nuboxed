import React, { lazy, Suspense } from "react";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddSuppliersForm from "./AddSuppliersForm";
import { FormattedMessage } from "react-intl";

const AddSuppliersModal = (props) => {
    const { addSuppliersModal, handleSuppliersModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
              title={<FormattedMessage
                id="app.suppliers"
                defaultMessage="Suppliers"
              />}
               
                width="60%"
                visible={addSuppliersModal}
                closable
                // maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{marginTop:"3rem"}}
                onClose={() => handleSuppliersModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddSuppliersForm {...formProps} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddSuppliersModal;

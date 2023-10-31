import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AddAccountForm from "./AddAccountForm";


const AddAccountModal = (props) => {
    const { addDistributorModal, handleDistributorModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Account"
                width="60%"
                visible={addDistributorModal}
                closable
                // maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleDistributorModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddAccountForm {...formProps} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAccountModal;

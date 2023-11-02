import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import UpdateAccountForm from "./UpdateAccountForm";


const UpdateAccountModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Distributor"
                width="55vw"
                visible={props.updateDistributorModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleUpdateDistributorModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateAccountForm distributorId={props.distributorId} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UpdateAccountModal;

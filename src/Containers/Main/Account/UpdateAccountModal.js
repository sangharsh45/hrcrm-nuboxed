import React, { Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import UpdateAccountForm from "./UpdateAccountForm";


const UpdateAccountModal = (props) => {
    const {RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Account"
                width="60%"
                visible={props.updateAccountModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ marginTop:"3rem" }}
                onClose={() => props.handleUpdateAccountModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateAccountForm RowData={RowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UpdateAccountModal;

import React, { lazy, Suspense, Component } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const AddAccountContactForm = lazy(() => import("./AddAccountContactForm"));

class AddAccountContact extends Component {
    render() {
        const {
            distributorContactModal,
            handleDistributorContactModal,
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Add Contact"
                    width="55vw"
                    visible={distributorContactModal}
                    destroyOnClose
                    maskClosable={false}
                    style={{ top: 40 }}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleDistributorContactModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AddAccountContactForm distributorId={this.props.distributorId} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddAccountContact;

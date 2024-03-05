import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
// import OpenReceivedOrderIdForm from "./OpenReceivedOrderIdForm";
const OpenReceivedOrderIdForm = lazy(() => import("./OpenReceivedOrderIdForm.js"));


class OpenReceivedOrderIdModal extends Component {
    render() {
        const {
            receivedOrdeIdModal,
            handleReceivedOrderIdModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Order No - ${this.props.rowData.newOrderNo}`}
                    width="80%"
                    visible={receivedOrdeIdModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleReceivedOrderIdModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <OpenReceivedOrderIdForm
                            rowData={this.props.rowData}
                            locationDetailsId={this.props.locationDetailsId}
                        />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default OpenReceivedOrderIdModal;

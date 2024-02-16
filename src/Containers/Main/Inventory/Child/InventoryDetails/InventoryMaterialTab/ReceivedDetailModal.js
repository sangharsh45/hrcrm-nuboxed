import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import ReceivedDetailCard from "./ReceivedDetailCard";
// const OpenReceivedOrderIdForm = lazy(() => import("./OpenReceivedOrderIdForm.js"));


class ReceivedDetailModal extends Component {
    render() {
        const {
            addMaterialReceived,
            handleMaterialReceived,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Details"
                    width="80%"
                    visible={addMaterialReceived}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleMaterialReceived(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ReceivedDetailCard row={this.props.row} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ReceivedDetailModal;

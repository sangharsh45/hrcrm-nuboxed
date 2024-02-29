import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import ReceivedDetailCard from "./ReceivedDetailCard";

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
                    title={`Po Details - ${this.props.row.newPoNumber}`}
                    width="70%"
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

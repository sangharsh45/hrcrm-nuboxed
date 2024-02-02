import React, { Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer} from "../../../Components/UI/Antd";

class AddIndentDrawer extends Component {
    render() {
        const {
            addIndentModal,
            handleAddIndentModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Create"
                    width="60%"
                    visible={addIndentModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleAddIndentModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <IndentStepper projectOrderId={this.props.projectOrderId} /> */}hello
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddIndentDrawer;

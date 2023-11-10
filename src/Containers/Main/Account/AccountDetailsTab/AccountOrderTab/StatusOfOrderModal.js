import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
const StatusOfOrder = lazy(() => import("./StatusOfOrder"));
class StatusOfOrderModal extends Component {
    render() {
        const {
            addStatusOfOrder,
            handleStatusOfOrder,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Status of Order"
                    width="70%"
                    visible={addStatusOfOrder}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleStatusOfOrder(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <StatusOfOrder particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default StatusOfOrderModal;

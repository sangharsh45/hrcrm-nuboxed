import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import StatusOfOrder from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrder";
// const StatusOfOrder = lazy(() => import("./StatusOfOrder"));
class StatusOfOrderDrawer extends Component {
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
                    style={{marginTop:"5rem"}}
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

export default StatusOfOrderDrawer;

import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { FormattedMessage } from 'react-intl';

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
                    title={<FormattedMessage
                        id="app.statusoforder"
                        defaultMessage="Status of Order"
                       />}
                    width="60%"
                    visible={addStatusOfOrder}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"3rem"}}
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

import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const AccountProductionForm = lazy(() => import("./AccountProductionForm"));

class AccountproductionModal extends Component {
    render() {
        const {
            accountOrderProduction,
            handleAccountProduction,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Send to production"
                    width="40%"
                    height="45%"
                    visible={accountOrderProduction}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "5rem" }}
                    onClose={() => handleAccountProduction(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountProductionForm particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountproductionModal;

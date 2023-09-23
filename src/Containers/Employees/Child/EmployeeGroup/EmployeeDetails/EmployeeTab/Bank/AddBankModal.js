import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";





const BankDocumentForm = lazy(() =>
    import("../Bank/BankDocumentForm")
);

class AddBankModal extends Component {
    render() {
        const { addBankModal, handleBankModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    //title="Bank"
                    title={<FormattedMessage
                        id="app.bank"
                        defaultMessage="Bank"
                    />}
                    width="25%"

                    visible={addBankModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"5rem"}}
                    onClose={() => handleBankModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <BankDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddBankModal;

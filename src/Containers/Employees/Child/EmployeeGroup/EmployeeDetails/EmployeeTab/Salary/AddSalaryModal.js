import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import SalaryDocumentForm from "./SalaryDocumentForm";


class AddSalaryModal extends Component {
    render() {
        const { addSalaryModal, handleSalaryModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    //title="Salary"
                    title={<FormattedMessage
                        id="app.salary"
                        defaultMessage="Salary"
                    />}
                    width="49%"
                    visible={addSalaryModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"5rem"}}
                    onClose={() => handleSalaryModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SalaryDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddSalaryModal;

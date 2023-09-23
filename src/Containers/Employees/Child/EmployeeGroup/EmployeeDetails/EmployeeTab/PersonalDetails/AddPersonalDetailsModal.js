import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import PersonalDetailDocumentForm from "./PersonalDetailsDocumentForm";

class AddPersonalDetailsModal extends Component {
    render() {
        const { addPersonalDetailsModal, handlePersonalDetailsModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    // title="Personal Details"
                    title={<FormattedMessage
                        id="app.personaldetails"
                        defaultMessage="Personal Details"
                    />}
                    width="60%"

                    visible={addPersonalDetailsModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"5rem"}}
                    onClose={() => handlePersonalDetailsModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <PersonalDetailDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddPersonalDetailsModal;

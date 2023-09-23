import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const ContactOpportunityForm = lazy(() => import("./ContactOpportunityForm"));

const AddContactOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledModal
        title={
          <FormattedMessage id="app.opportunity" defaultMessage="Opportunity" />
        }
        width="45%"
        visible={props.addContactOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onCancel={() => props.handleContactOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactOpportunityForm {...formProps} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddContactOpportunityModal;

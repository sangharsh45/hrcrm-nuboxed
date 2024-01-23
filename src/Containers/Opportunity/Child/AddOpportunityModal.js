import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const OpportunityForm = lazy(() => import("./OpportunityForm"));

const AddOpportunityModal = (props) => {
  const { addOpportunityModal, handleOpportunityModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.opportunity"
          defaultMessage="Opportunity"
        />}
        width="60%"
        visible={addOpportunityModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <OpportunityForm {...formProps}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;

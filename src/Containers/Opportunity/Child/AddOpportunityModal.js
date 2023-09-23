import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const OpportunityForm = lazy(() => import("./OpportunityForm"));

const AddOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.opportunity"
          defaultMessage="Opportunity"
        />}
        width="50%"
        style={{marginTop:"5rem"}}
        visible={props.addOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <OpportunityForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;

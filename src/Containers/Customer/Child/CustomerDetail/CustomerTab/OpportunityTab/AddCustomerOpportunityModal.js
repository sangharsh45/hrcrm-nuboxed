import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CustomerOpportunityForm = lazy(() => import("./CustomerOpportunityForm"));

const AddOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.opportunity" defaultMessage="Opportunity" />
        }
        width="45%"
        visible={props.addCustomerOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleCustomerOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerOpportunityForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;

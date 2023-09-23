import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

  const LeadsForm = lazy(() => import("../Child/LeadsForm"));
const TabPane = StyledTabs.TabPane;

class AddLeadsModal extends Component {
  render() {
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.leads"
            defaultMessage="Add Leads"
          />}

          width="55%"
          visible={addLeadsModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop:"5rem"}}
          onClose={() => handleLeadsModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <LeadsForm />{" "}
        </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddLeadsModal;

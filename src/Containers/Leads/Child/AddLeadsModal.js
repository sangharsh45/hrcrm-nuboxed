import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const LeadsForm = lazy(() => import("../Child/LeadsForm"));
const TabPane = StyledTabs.TabPane;

class AddLeadsModal extends Component {
  render() {
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.leads"
            defaultMessage="Add Leads"
          />}
          width={drawerWidth}
          visible={addLeadsModal}
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

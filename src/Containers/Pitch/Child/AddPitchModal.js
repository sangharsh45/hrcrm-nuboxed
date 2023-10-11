import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

import PitchForm from "../Child/PitchForm"

  //const LeadsForm = lazy(() => import("../Child/LeadsForm"));
const TabPane = StyledTabs.TabPane;

class AddPitchModal extends Component {
  render() {
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
        title="Pitch"

          width="55%"
          visible={this.props.addPitchModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop:"5rem"}}
          onClose={() => this.props.handlePitchModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <PitchForm />{" "}
       
        </Suspense>

       
        </StyledDrawer>
      </>
    );
  }
}

export default AddPitchModal;

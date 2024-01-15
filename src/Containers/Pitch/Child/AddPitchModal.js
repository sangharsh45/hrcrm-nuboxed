import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
const PitchForm =lazy(()=>import("../Child/PitchForm"));
const TabPane = StyledTabs.TabPane;

class AddPitchModal extends Component {
  render() {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
        title={
          <FormattedMessage
                  id="app.pitch"
                  defaultMessage="Pitch"
                />
        }
       

        width={drawerWidth}
          visible={this.props.addPitchModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop:"3rem"}}
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

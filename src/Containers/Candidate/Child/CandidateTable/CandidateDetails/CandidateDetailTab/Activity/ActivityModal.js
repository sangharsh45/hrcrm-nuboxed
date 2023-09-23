import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Icon } from "antd";

import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import ActivityTab from "./ActivityTab";

class ActivityModal extends Component {
  render() {
    const {
      addCandidateActivityModal,
      handleCandidateActivityModal,
      ...formProps
    } = this.props;

    return (
      <>
        <StyledDrawer
          title="Activity"
          visible={addCandidateActivityModal}
          width={"55vw"}
          bodyStyle={{ padding: 0 }}
          style={{marginTop:"5rem"}}
          maskClosable={false}
          destroyOnClose
          onClose={() => handleCandidateActivityModal(false)}
          footer={null}
        >
          <FlexContainer alignItems="center" justifyContent="space-evenly">
            <ActivityTab />
          </FlexContainer>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);

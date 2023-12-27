import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const ActivityTab =lazy(()=>import("../Activity/ActivityTab"));

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
          width={"60%"}
          bodyStyle={{ padding: 0 }}
          style={{marginTop:"3rem"}}
          maskClosable={false}
          destroyOnClose
          onClose={() => handleCandidateActivityModal(false)}
          footer={null}
        >
          <div class=" flex justify-evenly items-center" >
            <ActivityTab />
          </div>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);

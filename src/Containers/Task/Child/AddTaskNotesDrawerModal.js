import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../Components/UI/Antd";
import NotesForm from "./NotesForm";

class AddTaskNotesDrawerModal extends Component {
  render() {
    console.log("data5", this.props.data1);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.data1.taskName}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerTaskNotesModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleTaskNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <NotesForm data1={this.props.data1} />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskNotesDrawerModal);

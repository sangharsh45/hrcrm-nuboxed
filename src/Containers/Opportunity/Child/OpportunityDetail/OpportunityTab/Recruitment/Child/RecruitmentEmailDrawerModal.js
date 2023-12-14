import React, { Component,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, } from "draft-js";

class RecruitmentEmailDrawerModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      files: null,
      flag: null,
      status: "done",
    };
  }


  render() {
    const { editorState, placeholder } = this.state


    return (
      <div>
        <StyledDrawer
        //   title={this.props.item.name}
          width={"40%"}
          visible={this.props.addDrawerRecruitmentEmailModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleRecruitmentEmailDrawerModal(false)}
        >
           
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, employee, customer }) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitmentEmailDrawerModal);

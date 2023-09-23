import React, { Component, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import{handleRecruitmentDrawerModal} from "../../../SettingsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import WorkflowDocument from "../../../../Settings/Recruitement/Child/RecruitmentTab/WorkflowDocument";
import { Modal } from "antd";

class AddRecruitmentDrawerModal extends Component {
  render() {
    const {
      addDrawerRecruitmentModal,
      handleRecruitmentDrawerModal,
      recruitmentDrawerProps,
      data,
      processName
    } = this.props;
    

    console.log("full", this.props.processName);
    console.log("full1", this.props);

    return (
      <div>
        <StyledDrawer
            // title="DocumentChecklist"
            title={`${processName}-Document Checklist `}
          width={"40%"}
          visible={this.props.addDrawerRecruitmentModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleRecruitmentDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <WorkflowDocument
          allDocuments={this.props.allDocuments}
          />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, settings, contact }) => ({
 // contactById: contact.contactById,
 addDrawerRecruitmentModal:settings.addDrawerRecruitmentModal,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({handleRecruitmentDrawerModal}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecruitmentDrawerModal);

import React, { lazy, Suspense,Component } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button } from "antd";
const LinkedDocuments =lazy(()=> import("../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Document/LinkedDocuments"));
const AddDocumentForm =lazy(()=> import("../Child/AddDocumentForm"));

const ButtonGroup = Button.Group;

class AddDocumentModal extends Component {
  render() {
    const { documentUploadModal, handleDocumentUploadModal } = this.props;
    return (
      <>
        <StyledModal
          title="Document"
          //   title={
          //     <FormattedMessage id="app.document" defaultMessage="Document" />
          //   }
          width="65vw"
          visible={documentUploadModal}
          // destroyOnClose
          // maskClosable={false}
          // style={{ top: 40 }}
          // maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={() => handleDocumentUploadModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddDocumentForm />
            <LinkedDocuments />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddDocumentModal;
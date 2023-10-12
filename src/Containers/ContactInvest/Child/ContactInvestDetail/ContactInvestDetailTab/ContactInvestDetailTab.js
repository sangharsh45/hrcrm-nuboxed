import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MicIcon from "@mui/icons-material/Mic";
import { PlusOutlined } from "@ant-design/icons";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import ReactContactSpeechModal from "../ReactContactSpeechModal"
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import AddDocumentModal from "./Document/AddDocumentModal";
// import OpportunityTable from "./Opportunity/LinkedOpportunity";
import WorkIcon from "@mui/icons-material/Work";
// import AddContactOpportunityModal from "../../../Child/ContactDetail/ContactTab/Opportunity/AddContactOpportunityModal";
import {
  handleContactOpportunityModal,
  handleContactReactSpeechModal,
  getOpportunityListByContactId,
  handleDocumentUploadModal,
} from "../../../../Contact/ContactAction";
import LinkedContactInvestNotes from "./ContactInvestNotes/LinkedContactInvestNotes";
import LinkedContactInvestDocuments from "./ContactInvestDocument/LinkedContactInvestDocuments";

const TabPane = StyledTabs.TabPane;

class ContactInvestDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const {
      contactInVestDetail: { contactId, firstName, middleName, lastName },
      handleDocumentUploadModal,
      documentUploadModal,
      handleContactOpportunityModal,
      addContactOpportunityModal,
      handleContactReactSpeechModal,
      addContactSpeechModal,
      getOpportunityListByContactId,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {/* <TabPane
              tab={
                <>
                 
                 <WorkIcon style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">
                     <FormattedMessage
                      id="app.orders"
                      defaultMessage="Orders"
                    />
                  </span>
                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OpportunityTable />
              </Suspense>
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{ fontSize: "1.1rem" }} />
                    &nbsp;
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    &nbsp;
                    {activeKey === "2" && (
                      <>
                        <Tooltip title="Voice to Text">
                          <span
                            onClick={() => handleContactReactSpeechModal(true)}
                          >
                            <MicIcon style={{ fontSize: "1.1rem" }} />
                          </span>
                        </Tooltip>
                      </>
                    )}
                  </span>
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactInvestNotes />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon style={{ fontSize: "1.1rem" }} />
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactInvestDocuments />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          {/* <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContactOpportunityModal
            addContactOpportunityModal={addContactOpportunityModal}
            handleContactOpportunityModal={handleContactOpportunityModal}
            defaultContacts={[
              {
                label: `${firstName || ""} ${middleName || ""} ${lastName ||
                  ""}`,
                value: contactId,
              },
            ]}
            contactId={{ value: contactId }}
            callback={() => getOpportunityListByContactId(contactId)}
          />
           <ReactContactSpeechModal
           contactId={ contactId }
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact }) => ({
  //   addContactSpeechModal:contact.addContactSpeechModal,
  //   documentUploadModal: contact.documentUploadModal,
  //   addContactOpportunityModal: contact.addContactOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleContactOpportunityModal,
      getOpportunityListByContactId,
      handleContactReactSpeechModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInvestDetailTab);

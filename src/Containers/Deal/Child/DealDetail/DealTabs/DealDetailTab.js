import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { bindActionCreators } from "redux";
// import RecruitmentDeletedTable from "../../OpportunityDetail/OpportunityTab/Recruitment/RecruitmentDeletedTable"
import { Button, message, Tooltip, Popover, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import PieChartIcon from '@mui/icons-material/PieChart';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  FlexContainer,
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import {
  DeleteOutlined,
  EyeInvisibleOutlined, LinkOutlined, PlusOutlined, 
} from '@ant-design/icons';
// import { handleDealContactModal,handleLinkContactModal } from "../../../../Contact/ContactAction";
// import RecruitmentClosedTable from "../OpportunityTab/RecruitmentClosedTable"
// import {handleReactSpeechModal} from "../../../OpportunityAction"
// import {
//     getContactListByOpportunityId,
//     clearReducerState,
//   handleDocumentUploadModal,
//      linkContactsCheckToOpportunity,
//   handleRecruitModal,
//   handleTagProfileModal,
//   getRecruitByOpportunityId,
  
// } from "../../../OpportunityAction";
import MicIcon from '@mui/icons-material/Mic';
import LockIcon from '@mui/icons-material/Lock';
import { BundleLoader } from "../../../../../Components/Placeholder";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {handleDealContactModal} from "../../../DealAction";
// import ReactSpeechModal from "./ReactSpeechModal";
// const RecruitmentTable = lazy(() => import("./Recruitment/RecruitmentTable"));
// const AddRecruitModal = lazy(() => import("./Recruitment/AddRecruitModal"));
// const AddTagProfileModal = lazy(() => import("./Recruitment/AddTagProfileModal"));
// const RecruitProJumpstart = lazy(() => import("../../RecruitProJumpstart/RecruitProJumpstart"));
// const SummaryTable = lazy(() => import("./Recruitment/Child/SummaryTable"));
// const LinkedNotes = lazy(() => import("./LinkedNotes"));
// const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const LinkedDealContact = lazy(() => import("./DealContact/LinkedDealContact"));
const DealContactModal = lazy(() => import("./DealContact/DealContactModal"));
// const LinkContactModal = lazy(() => import("../../../../Contact/Child/LinkContactModal"));
// const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DealDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "2",
      contactPopover: false,
      closedPopover:false,
      deletePopover:false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      recruitmentboard:false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleRecriutmentdashboard = () => {
    this.setState({ 
      recriutmentdashboard: true,
      breadCumb:false,
      closedPopover:false
     });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ 
      closedPopover:false,
      breadCumb:true,
      recriutmentdashboard: false,
     });
  };

  componentWillUnmount() {
    // this.props.clearReducerState();
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
    handleClosedPopoverVisibleChange = () =>
    this.setState({ 
      closedPopover: true,
      recriutmentdashboard:false,
      breadCumb:false
     });

     handledeletedPopoverVisibleChange = () =>
     this.setState({ 
       deletePopover: true,
       closedPopover: false,
       recriutmentdashboard:false,
       breadCumb:false
      });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
      user: {
        metaData: {  },
      },
      dealDetailsbyID: { invOpportunityId, opportunityName, accountId },
      user,
      fetchDealdetails,
      openDealContactModal,
      handleDealContactModal,
      linkContactsCheckToOpportunity,
      getContactListByOpportunityId,
      handleLinkContactModal,
      linkContactsToOpportunity,
      handleDocumentUploadModal,
      handleReactSpeechModal,
      dealDetailsbyID,
      addSpeechModal,
      documentUploadModal,
    } = this.props;
    const { deliveryInd, stageName } = this.props;
    if(fetchDealdetails){
return  <BundleLoader />
    }
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="2"
            onChange={this.handleTabChange}
            forceRender={true}
          >
             <TabPane
              tab={
                <>
                  <span>
                    <ContactsIcon   style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: '0.25em' }}>
                      <FormattedMessage
                        id="app.contacts"
                        defaultMessage="Contacts"
                      />
                    </span>
                  </span>
                
                  {activeKey === "2" && (
                    <>
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                         {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Create"
                          onClick={() => {
                            this.handleContactPopoverVisibleChange();
                            handleDealContactModal(true);
                          }}
                          size="0.875em"
                          style={{ verticalAlign: "center", marginLeft: "0.125em" }}
                        />
                         )}
                         
                      </Tooltip>
                      <Tooltip 
                          title={<FormattedMessage
                            id="app.tagexisting"
                            defaultMessage="Tag Existing"
                          />}
                      >
                        <LinkOutlined
                            type="link"
                            onClick={() => {
                              this.handleContactPopoverVisibleChange();
                              handleLinkContactModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-0.31em",
                              verticalAlign: "center",
                            }}
                          />

                     </Tooltip>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDealContact dealDetailsbyID={this.props.dealDetailsbyID}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon   style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.documents"
                        defaultMessage="Documents"
                      />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          tooltiptitle={<FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />}
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
                          size="0.875em"
                          style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments opportunity={opportunity} /> */}
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{fontSize:"1.1rem"}}/>
                    &nbsp;
                    <FormattedMessage
                      id="app.notes"
                      defaultMessage="Notes"
                    />
                    &nbsp;
                    {activeKey === "4" && (
                      <>
                        <Tooltip title="Voice to Text">
                      <span                       
                   onClick={()=>handleReactSpeechModal(true)}>
                  <MicIcon
                  style={{fontSize:"1.1rem"}}
                 />
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                  </span>
                </>
              }
              key="4">
              <Suspense fallback={"Loading ..."}>
                {" "}
            
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <DealContactModal
            openDealContactModal={openDealContactModal}
            handleDealContactModal={handleDealContactModal}
            // callback={() => getContactListByOpportunityId(opportunityId)}
            linkContact
          />
          {/* <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />

          <LinkContactModal
            opportunityId={{ value: opportunityId }}
            linkAction={linkContactsToOpportunity}
            linkContactsCheckToOpportunity={linkContactsCheckToOpportunity}
            defaultOpportunities={[
              { label: opportunityName, value: opportunityId },
            ]}
            linkType="opportunity"
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <ReactSpeechModal
          opportunityId={opportunityId}
          handleReactSpeechModal={handleReactSpeechModal}
          addSpeechModal={addSpeechModal}
          /> */}
      
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  opportunity,
  deal,
}) => ({
  fetchDealdetails:deal.fetchDealdetails,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  opportunityId: opportunity.opportunity.opportunityId,
  // organizationId: auth.userDetails.organizationId,
  opportunity: opportunity.opportunity,
  openDealContactModal: deal.openDealContactModal,
  linkContactModal:contact.linkContactModal,
  addSpeechModal:opportunity.addSpeechModal, 
  addRecruitModal: opportunity.addRecruitModal,
  addTagProfileModal: opportunity.addTagProfileModal,
  documentUploadModal: opportunity.documentUploadModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDealContactModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailTab);

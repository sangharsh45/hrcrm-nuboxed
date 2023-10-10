import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { FormattedMessage } from "react-intl";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MicIcon from '@mui/icons-material/Mic';
import PieChartIcon from '@mui/icons-material/PieChart';
import ContactsIcon from '@mui/icons-material/Contacts';
import {
  handleDocumentUploadModal,
  getContactListByCustomerId,
  getOpportunityListByCustomerId,
  handleCustomerOpportunityModal,
  handleCustomerProjectDrawer,
  handleCustomerContactModal,
  //handleCustomerCommercialsModal,
  handleRecruitModal,
  handlefileRecruitModal,
  handleTagProfileModal,
  handleInvoiceModal,
  handleCustomerReactSpeechModal,
} from "../../../../Customer/CustomerAction";

const TabPane = StyledTabs.TabPane;

function handleRefreshPage() {
  window.location.reload();
}

class ContactDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
      file: false,
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
    this.props.getContactListByCustomerId(this.props.customer.customerId);
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });

  };
  render() {
    const { activeKey } = this.state;
    const {
      customer: { customerId, name },
      handleDocumentUploadModal,
      documentUploadModal,
      handleCustomerReactSpeechModal,
      addCustomerSpeechModal,
      handleCustomerContactModal,
      addCustomerContactModal,
      handleCustomerOpportunityModal,
      handleCustomerProjectDrawer,
      addCustomerOpportunityModal,
      addCustomerProjectDrawer,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      addInvoiceModal,
      handleInvoiceModal,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon  style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      <FormattedMessage
                        id="app.opportunity"
                        defaultMessage="Opportunity"
                      />
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {this.props.user.opportunityCreateInd === true && (
                          <PlusOutlined
                            type="plus"
                            //tooltipTitle="Create"
                            tooltiptitle={
                              <FormattedMessage
                                id="app.Create"
                                defaultMessage="Create"
                              />
                            }
                            onClick={() => {
                              handleCustomerOpportunityModal(true);
                            }}
                            size="0.875em"
                          />
                        )}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedOpportunity /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      {/* Contacts */}
                      <FormattedMessage
                        id="app.contacts"
                        defaultMessage="Contacts"
                      />
                    </span>
                  </span>
                  {activeKey === "2" && (
                    <>
               
                      <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {this.props.user.contactCreateInd === true && (
                          <PlusOutlined
                            type="plus"
                            //tooltipTitle="Create"
                            tooltiptitle={
                              <FormattedMessage
                                id="app.Create"
                                defaultMessage="Create"
                              />
                            }
                            onClick={() => {
                              handleCustomerContactModal(true);
                            }}
                            size="0.875em"
                          />
                        )}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedContact /> */}
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <MonetizationOnIcon 
                 style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">Commercials</span>
                </>
              }
              key="9"
            >
              <CommercialsForm />
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                  style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "5" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        //tooltipTitle="Upload Document"
                        title={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{fontSize:"1.1rem"}}/>
           
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
            
                    {activeKey === "6" && (
                      <>
                        <Tooltip title="Voice to Text">
                          <span
                            onClick={() => handleCustomerReactSpeechModal(true)}
                          >
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
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedNotes /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <ReceiptIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                    {
                      <FormattedMessage
                        id="app.invoice"
                        defaultMessage="Invoice"
                      />
                    }
                    {/* Documents */}
                  </span>
                  {activeKey === "7" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                        onClick={() => handleInvoiceModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedInvoice /> */}
              </Suspense>
            </TabPane>
           
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
          {/* <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />

     
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />

          <AddCustomerContactModal
            addCustomerContactModal={addCustomerContactModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getContactListByCustomerId(customerId)}
          />
          <AddInvoiceModal
            addInvoiceModal={addInvoiceModal}
            handleInvoiceModal={handleInvoiceModal}
          />
          <ReactCustomerSpeechModal
            customerId={customerId}
            handleCustomerReactSpeechModal={handleCustomerReactSpeechModal}
            addCustomerSpeechModal={addCustomerSpeechModal}
          />
          <AddCustomerOpportunityModal
            addCustomerOpportunityModal={addCustomerOpportunityModal}
            handleCustomerOpportunityModal={handleCustomerOpportunityModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getOpportunityListByCustomerId(customerId)}
          />
                 <AddProjectDrawer
            addCustomerProjectDrawer={addCustomerProjectDrawer}
            handleCustomerProjectDrawer={handleCustomerProjectDrawer}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  documentUploadModal: customer.documentUploadModal,
  addCustomerContactModal: customer.addCustomerContactModal,
  addCustomerOpportunityModal: customer.addCustomerOpportunityModal,
  customerId: customer.customer.customerId,
  user: auth.userDetails,
  addCustomerProjectDrawer:customer.addCustomerProjectDrawer,
  userId: auth.userDetails.userId,
  addCustomerSpeechModal: customer.addCustomerSpeechModal,
  customer: customer.customer,
  addRecruitModal: customer.addRecruitModal,
  addFileRecruitModal: customer.addFileRecruitModal,
  addTagProfileModal: customer.addTagProfileModal,
  addInvoiceModal: customer.addInvoiceModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleCustomerContactModal,
      handleCustomerOpportunityModal,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      handleRecruitModal,
      handlefileRecruitModal,
      handleTagProfileModal,
      handleInvoiceModal,
      handleCustomerProjectDrawer,
      handleCustomerReactSpeechModal,
      //handleCustomerCommercialsModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);

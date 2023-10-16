import React, { lazy, Suspense, useEffect, useState, } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import AddCustomerModal from "../Customer/Child/AddCustomerModal";
import { handleCustomerModal } from "../Customer/CustomerAction";
import { handleTaskModal } from "../Task/TaskAction";
import AddTaskModal from "../Task/Child/AddTaskModal";
import UploadOrganization from "./UploadOrganization"
import {
  handleCandidateResumeModal,
} from "../Candidate/CandidateAction";
import StartStop from "./Start&Stop/StartStop";
import { bindActionCreators } from "redux";
import AddCandidateResumeModal from "../Candidate/Child/AddCandidateResumeModal";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  Layout,
  message,
  Popconfirm,
} from "antd";
import { ThemeProvider } from "styled-components";
import Button from "antd/lib/button";
import {
  ApplicationWrapper,
  LayoutWrapper,
  NavbarWrapper,
  FlexContainer,
} from "../../Components/UI/Layout";
import { handlePartnerModal } from "../Partner/PartnerAction";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { BundleLoader } from "../../Components/Placeholder";
import AppErrorBoundary from "../../Helpers/ErrorBoundary/AppErrorBoundary";
import PotectedRoute from "../../Helpers/Auth/PotectedRoute";
import NavMenu from "./NavMenu";
import ProfileDropdown from "./ProfileDropdown";
import SettingsDropdown from "../Settings/SettingsDropdown";
import PortraitIcon from "@mui/icons-material/Portrait";
import IsAuthorized from "../../Helpers/Auth/IsAuthorized";
import Rules from "../Rules/Rules";
import Template from "../Template/Template";
import Theme from "../Settings/Theme/Theme";
import { getPresentNotifications } from "../Notification/NotificationAction";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { MultiAvatar } from "../../Components/UI/Elements";
import Call from "../Call/Call";
import Holiday from "../Holiday/Holiday";
import Reports from "../Reports/Reports";
import Partner from "../Partner/Partner";
import ContactsIcon from "@mui/icons-material/Contacts";
import Category from "../Settings/Category/Category";
import { handleContactModal } from "../Contact/ContactAction";
import Recruitment from "../Settings/Recruitement/Recruitment";
import { Select } from "antd";
import { updateUserById } from "../Auth/AuthAction";
import { setLanguage } from "../../Language/LanguageAction";
import { handleOpportunityModal } from "../Opportunity/OpportunityAction";
import { getOpportunityRecord } from "../Opportunity/OpportunityAction";
import CategoryTab from "../Settings/Category/CategoryTab";
import { handleMessageModal } from "../LiveMessages/LiveMessageAction";
import LiveMesssageModal from "../LiveMessages/LiveMesssageModal";
import AssessmentDetails from "../Accessment/Child/AssessmentDetails/AssessmentDetails";
import Leads from "../Leads/Leads";
import LeadDetails from "../Leads/Child/LeadsDetailTab/LeadDetails";
import Subscription from "./Subscription";
import Program from "../Program/Program";
import Course from "../Course/Course";
import Billing from "../../Components/Billing/Billing";
import AddCallModal from "../Call/Child/AddCallModal";
import { handleCallModal } from "../Call/CallAction";
import { handleEventModal } from "../Event/EventAction";
import AddEventModal from "../Event/Child/AddEventModal";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CourseDetails from "../Course/Child/CourseDetailsTab/CourseDetails";
import ProgramDetails from "../Program/Child/ProgramDetails/ProgramDetails";
import Projects from "../Projects/Projects";
import ProjectsDetail from "../Projects/Child/ProjectsDetail/ProjectsDetail";
import Invoice from "../Invoice/Invoice";
import CandidateTotalBilling from "../Projects/Child/ProjectDetailsTab/CandidateTotalBilling";
import { getSupportedLanguages } from '../Translate/TranslateService';
import Location from "../Event/Child/Location/Location";
import MobileNavMenu from "./Mobilemenu";
import PitchDetails from "../Pitch/Child/PitchDetails/PitchDetails"
import Navmenu2 from "./Navmenu2";

const OpportunityDetail = lazy(() =>
  import("../Opportunity/Child/OpportunityDetail/OpportunityDetail")
);
const CustomerDetail = lazy(() =>
  import("../Customer/Child/CustomerDetail/CustomerDetail")
);
const ContactDetail = lazy(() =>
  import("../Contact/Child/ContactDetail/ContactDetail")
);
const CandidateDetails = lazy(() =>
  import("../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetails")
);

const Customer = lazy(() => import("../Customer/Customer"));
const AddOpportunityModal = lazy(() =>
  import("../Opportunity/Child/AddOpportunityModal")
);
const Publish = lazy(() => import("../Publish/Publish"));
const Opportunity = lazy(() => import("../Opportunity/Opportunity"));

const { Option } = Select;

const { Header, Sider, Content } = Layout;
const Profile = lazy(() => import("../Profile/Profile"));
const Permissions = lazy(() => import("../Permissions/Permissions"));
const Organization = lazy(() => import("../Organization/Organization"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Library = lazy(() => import("../Settings/Library/Library"));
const Planner = lazy(() => import("../Planner/Planner"));
const EmployeeDetails = lazy(() =>
  import("../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeDetails")
);
const Settings = lazy(() => import("../Settings/Settings"));
const AddPartnerModal = lazy(() => import("../Partner/child/AddPartnerModal"));
const Mileage = lazy(() => import("../Mileage/Mileage"));
const Expense = lazy(() => import("../Expense/Expense"));
const Employees = lazy(() => import("../Employees/Employees"));
const Accessment = lazy(() => import("../Accessment/Accessment"));
const Task = lazy(() => import("../Task/Task"));
const Event = lazy(() => import("../Event/Event"));
const Leave = lazy(() => import("../Leave/Leave"));
const PageNotFound = lazy(() => import("../404/PageNotFound"));
const LiveMessage = lazy(() =>
  import("../../Containers/LiveMessages/LiveMessage")
);

const NotificationPopover = lazy(() =>
  import("../Notification/NotificationPopover")
);
const ChangePassword = lazy(() => import("../Auth/ChangePassword"));

const Contact = lazy(() => import("../Contact/Contact"));
const Candidate = lazy(() => import("../Candidate/Candidate"));

const PartnerDetail = lazy(() =>
  import("../Partner/child/PartnerDetail/PartnerDetail")
);
const AccountImport = lazy(() => import("../Import/Child/AccountImport"));
const Requirement = lazy(() => import("../Requirement/Requirement"));
const Demand = lazy(() => import("../Demand/Demand"));
const AddContactModal = lazy(() => import("../Contact/Child/AddContactModal"));
const Pitch=lazy(()=>import("../Pitch/Pitch"));
const Deal=lazy(()=>import("../Deal/Deal"));
const ContactInvest=lazy(()=>import("../ContactInvest/ContactInvest"));
const Investor=lazy(()=>import("../Investor/Investor"));
const InvestorDetail = lazy(() =>import("../Investor/Child/InvestorDetail/InvestorDetail"));
const ContactInvestDetail = lazy(() =>import("../ContactInvest/Child/ContactInvestDetail/ContactInvestDetail"));
const DealDetail=lazy(()=>import("../Deal/Child/DealDetail/DealDetail"));

function MainApp(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('en');
 
  const [supportedLanguages, setSupportedLanguages] = useState([]);

  useEffect(() => {
    props.getOpportunityRecord(props.userId);
  }, []);

 

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        const languages = await getSupportedLanguages();
        setSupportedLanguages(languages);
      } catch (error) {
        console.error('Error fetching supported languages:', error);
      }
    };

    fetchSupportedLanguages();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  function toggle() {
    setCollapsed(!collapsed);
  }

  function toggleTheme(value) {
    setTheme(value ? "light" : "light");
  }
  function handleLanguageSelect(data) {
    props.updateUserById({
      preferedLanguage: data,
      employeeId: props.userId,
    });
    message.success(`Language sucessfully changed to ${data} `);
  }
  // render() {
  const background = theme === "light" ? "#fff" : null;
  const { organization, user, imageId, orgImageId, organizationName } = props;
  console.log("Done", props.imageId);
  console.log(user);
  let path = window.location.href.split("/")[3];
  console.log("paaaaaaaath", path);

  const organizationLogo = (
    <MultiAvatar
      imageId={imageId}
      //marginLeft="30px"
      // primaryTitle={organizationName}
    />
  );
  return (
    <>
      <ThemeProvider theme={props.theme}>
        <LayoutWrapper>
        <div class="max-sm:hidden">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={"10vw"}
            style={{
              minHeight: "100vh",
              background: "#38445E",
              overflow: "auto",
              //flex:"0 0 11vw"
              // height: "100vh",
              // position: "fixed",
            }}
          >
            {/* <div
            className="logo"
            style={{
              justifyContent: !collapsed ? "flex-start" : "center",
              height: 50,
            }}
          > */}
            <div
              className="logo"
              style={{
                justifyContent: !collapsed ? "center" : "center",
                height: 50,
                marginLeft: "40px",
              }}
            >
              {collapsed && organizationLogo}
              {!collapsed && organizationLogo}
              {/* {collapsed && organizationLogo}
            {!collapsed && organizationLogo} */}
              {/* {this.state.collapsed && organizationLogo}
                            {!this.state.collapsed && organizationLogo}
                            {!this.state.collapsed && <span style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >{organization.organizationName}</span>} */}

              {/* {collapsed && (
              <img
                className="small-logo"
                src={FWShortLogo}
                style={{ height: 50 }}
              />
            )}
            {!collapsed && (
              <img
                className="big-logo"
                src={FWLogo}
                style={{ height: "40px", marginLeft: "28px" }}
              />
            )} */}
            </div>
            <NavMenu
              collapsed={collapsed}
              toggleCollapsed={toggle}
              toggleTheme={toggleTheme}
              theme={theme}
              selectedLanguage={selectedLanguage}
            />
          </Sider>
          </div>
          <LayoutWrapper>
            <NavbarWrapper style={{ padding: 0, height: 50, alignItems: "center", position: "sticky", zIndex: "999",top:" 0.15rem",
  
 
 }}>
              <Header>
              <div class="md:hidden"><Navmenu2  selectedLanguage={selectedLanguage}/></div>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignSelf: "flex-start",
                    alignItems: "center",
                  }}
                >
                  &nbsp;&nbsp;
        
                </div>
                <StartStop/>
                {/* <Popconfirm
                title="Stop"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{
                  loading: confirmLoading,
                }}
                onCancel={handleCancel}
              >
                <Button
                  type="primary"
                  htmlType="start"
                  // Loading={isSubmitting}
                  // Loading={this.state.Loading}
                  style={{ width: "10%", height: "2.5em", backgroundColor: "green" }}
                  onClick={showPopconfirm}
                // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                >
                  Start
                </Button>

              </Popconfirm>  */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginRight: 20,
                    height: 45,
                  }}
                >
                  {/* <ReactChat /> */}

                  {/* <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{
                      right: 24,
                    }}
                    icon={<CustomerServiceOutlined />}
                  >
                   
                    <FloatButton
                      tooltip={<div>Customer</div>}
                      icon={
                        <ApartmentIcon
                          onClick={() => {
                            props.handleCustomerModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Contact</div>}
                      icon={
                        <ContactsIcon
                          onClick={() => {
                            props.handleContactModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Opportunity</div>}
                      icon={
                        <LightbulbIcon
                          onClick={() => {
                            props.handleOpportunityModal(true);
                          }}
                        />
                      }
                    />
                    <FloatButton
                      tooltip={<div>Partner</div>}
                      icon={
                        <HandshakeIcon
                          onClick={() => {
                            props.handlePartnerModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Talent</div>}
                      icon={
                        <PortraitIcon
                          onClick={() => {
                            props.handleCandidateResumeModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Call</div>}
                      icon={
                        <VolumeUpIcon
                          onClick={() => {
                            props.handleCallModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Event</div>}
                      icon={
                        <EventAvailableIcon
                          onClick={() => {
                            props.handleEventModal(true);
                          }}
                        />
                      }
                    />

                    <FloatButton
                      tooltip={<div>Task</div>}
                      icon={
                        <FactCheckIcon
                          onClick={() => {
                            props.handleTaskModal(true);
                          }}
                        />
                      }
                    />
                  </FloatButton.Group> */}

                  {/* <Link
                                        to='/opportunity-stage'
                                        style={{ height: 45, marginRight: 20 }}>
                                        <FlexContainer alignItems='center' style={{ height: '100%' }}>
                                            <Badge count={0} >
                                                <Icon type="setting" style={{ fontSize: '1.375em' }} />
                                            </Badge>
                                        </FlexContainer>
                                    </Link> */}
                  {/* <Subscription /> */}
                 
                  <div class="max-sm:hidden"
                    style={{
                      backgroundColor: "#ff7158bf",
                      color: "white",
                      // borderColor: "rgb(251, 133, 0)",
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      position: "relative",
                      height: "27px",
                      fontFamily:"Poppins",
                      textAlign: "center",
                      lineHeight: "24px",
                      padding: "0px 10px",
                      marginLeft: "auto",
                      marginRight: "20px",
                    }}
                  >
                    {props.department}
                  </div>
                  <div class="max-sm:hidden"
                    style={{
                      backgroundColor: "#ff7158bf",
                      color: "white",
                      // borderColor: "rgb(251, 133, 0)",
                      border: "1px solid tomato",
                      borderRadius: "5px",
                      position: "relative",
                      height: "27px",
                      fontFamily:"Poppins",
                      textAlign: "center",
                      lineHeight: "24px",
                      padding: "0px 10px",
                      marginLeft: "auto",
                      marginRight: "20px",
                    }}
                  >
                    {props.roleType}
                  </div>
                  {/* <Subscription /> */}
                  {user.settingsAccessInd === true ?
                  <IsAuthorized>
                  
                    <SettingsDropdown />
                  
                  </IsAuthorized>
                    : null}
                  {/* <a href="#" style={{ height: 45, marginRight: 20 }}>
                                        <FlexContainer alignItems='center' style={{ height: '100%' }}>
                                            <Badge count={5} >
                                                <Icon type="user" style={{ fontSize: '1.375em' }} />
                                            </Badge>
                                        </FlexContainer>
                                    </a> */}
                  <a href="#" style={{ height: 45, marginRight: 20 }}>
                    <FlexContainer
                      alignItems="center"
                      style={{ height: "100%" }}
                    >
                      <NotificationPopover />
                    </FlexContainer>
                  </a>
                  {/* <Link to="/help" style={{ height: 45, marginRight: 20 }}>
                    <Tooltip title="Knowledge Hub">
                      <FlexContainer
                        alignItems="center"
                        style={{ height: "100%" }}
                      >
                        
                        <Icon
                          type="question-circle"
                          style={{
                            fontSize: path === "help" ? "1.75em" : "1.375em",
                            color: path === "help" && "#0582f5"
                          }}
                        />
                       
                      </FlexContainer>
                    </Tooltip>
                  </Link> */}
                   <UploadOrganization />
                  <ProfileDropdown />
                  {/* <Theme /> */}
                </div>
              </Header>
            </NavbarWrapper>
            <ApplicationWrapper>
              <AppErrorBoundary>
                <Content>
                  <Suspense maxDuration={6000} fallback={<BundleLoader />}>
                    <Switch>
                      <Route exact path="/planner" component={Planner} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/Invoice" component={Invoice} />
                      <Route
                        exact
                        path="/permissions"
                        component={Permissions}
                      />
                      <Route exact path="/mileage" component={Mileage} />
                      <Route exact path="/expense" component={Expense} />
                      <Route exact path="/location" component={Location} />
                      <Route exact path="/employees" component={Employees} />
                      <Route exact path="/leads" component={Leads} />
                      <Route exact path="/accessment" component={Accessment} />
                      <Route exact path="/holiday" component={Holiday} />
                      <Route
                        exact
                        path="/organization"
                        component={Organization}
                      />
                      <Route exact path="/leave" component={Leave} />
                      <Route exact path="/rules" component={Rules} />
                      <Route exact path="/template" component={Template} />
                      {/* <Route exact path="/documents" component={Documents} /> */}
                      <Route exact path="/category" component={Category} />
                      <Route
                        exact
                        path="/categoryTab"
                        component={CategoryTab}
                      />
                      {/* <Route exact path="/task" component={Task} /> */}
                      <Route exact path="/library" component={Library} />
                      <Route exact path="/planner" component={Planner} />
                      <Route exact path="/setting" component={Settings} />
                      <Route exact path="/reports" component={Reports} />
                      <Route exact path="/partner" component={Partner} />
                      <Route exact path="/call" component={Call} />
                      <Route exact path="/task" component={Task} />
                      <Route exact path="/event" component={Event} />
                      <Route
                        exact
                        path="/employee/:id"
                        component={EmployeeDetails}
                      />
                        <Route
                        exact
                        path="/hour/candidate/hour-details/project/:candidateId/:projectId"
                        component={CandidateTotalBilling}
                      />
                      <Route
                        exact
                        path="/leads/:leadsId"
                        component={LeadDetails}
                      />

                      <Route
                        exact
                        path="/course/:courseId"
                        component={CourseDetails}
                      />

                      <Route
                        exact
                        path="/projects/:ProjectId"
                        component={ProjectsDetail}
                      />
                      <Route
                        exact
                        path="/program/:programDetailsId"
                        component={ProgramDetails}
                      />
                      <Route
                        exact
                        path="/assessment/:assessmentId"
                        component={AssessmentDetails}
                      />

                      <Route
                        exact
                        path="/change-password"
                        component={ChangePassword}
                      />

                      <Route exact path="/recruite" component={Recruitment} />
                      <Route exact path="/contact" component={Contact} />
                      <Route exact path="/customer" component={Customer} />
                      <Route exact path="/publish" component={Publish} />
                      <Route exact path="/program" component={Program} />
                      <Route exact path="/course" component={Course} />
                      <Route exact path="/project" component={Projects} />
                      <Route exact path="/billing" component={Billing} />
                      <Route
                        exact
                        path="/opportunity"
                        component={Opportunity}
                      />
                      {/* <Route exact path="/candidate" 
                      component={Candidate}   
                      /> */}


<Route
  exact
  path="/candidate"
  render={(props) => <Candidate {...props}  selectedLanguage={selectedLanguage} />}
/>
                      <Route exact path="/message" component={LiveMessage} />
                     

<Route
  exact
  path="/candidate/:candidateId"
  render={(props) => <CandidateDetails {...props}  selectedLanguage={selectedLanguage} />}
/>
                      <Route
                        exact
                        path="/customer/:customerId"
                        component={CustomerDetail}
                      />
                      <Route
                        exact
                        path="/contact/:contactId"
                        component={ContactDetail}
                      />

<Route
                        exact
                        path="/pitch/:investorLeadsId"
                        component={PitchDetails}
                      />
                      <Route
                        exact
                        path="/opportunity"
                        component={Opportunity}
                      />
                      <Route
                        exact
                        path="/opportunity/:opportunityId"
                        component={OpportunityDetail}
                      />
                      <Route
                        exact
                        path="/partner/:partnerId"
                        component={PartnerDetail}
                      />
                      {/* <PotectedRoute exact path="/users" component={Users} /> */}
                      <Route
                        exact
                        path="/import/account"
                        component={AccountImport}
                      />
                      <Route
                        exact
                        path="/requirement"
                        component={Requirement}
                      />
                      <Route exact path="/demand" component={Demand} />

                      <Route exact path="/pitch" component={Pitch}/>
                      <Route exact path="/deal" component={Deal}/>
                      <Route exact path="/contactInvest" component={ContactInvest}/>
                      <Route exact path="/investor" component={Investor}/>
                      <Route exact path="/investor/:investorId"  component={InvestorDetail} />
                      <Route exact path="/contactinvest/:contactId"  component={ContactInvestDetail} />
                      <Route exact path="/dealDetails/:invOpportunityId" component={DealDetail}/>

                      <Route path="**" component={PageNotFound} />
                    </Switch>
                  </Suspense>
                </Content>
              </AppErrorBoundary>
            </ApplicationWrapper>
          </LayoutWrapper>
        </LayoutWrapper>
      </ThemeProvider>
      <LiveMesssageModal
        addMessageModal={props.addMessageModal}
        handleMessageModal={props.handleMessageModal}
      />
      <AddCustomerModal
        addCustomerModal={props.addCustomerModal}
        handleCustomerModal={props.handleCustomerModal}
      />
      <AddContactModal
        addContactModal={props.addContactModal}
        handleContactModal={props.handleContactModal}
      />

      <AddOpportunityModal
        addOpportunityModal={props.addOpportunityModal}
        handleOpportunityModal={props.handleOpportunityModal}
      />

      <AddPartnerModal
        addPartnerModal={props.addPartnerModal}
        handlePartnerModal={props.handlePartnerModal}
      />
      <AddCandidateResumeModal
        addCandidateResumeModal={props.addCandidateResumeModal}
        handleCandidateResumeModal={props.handleCandidateResumeModal}
        // handleResponseData={this.handleResponseData}
        // responseData={this.state.responseData}
      />

      <AddCallModal
        addCallModal={props.addCallModal}
        handleCallModal={props.handleCallModal}
      />

      <AddEventModal
        addEventModal={props.addEventModal}
        handleEventModal={props.handleEventModal}
      />

      <AddTaskModal
        addTaskModal={props.addTaskModal}
        handleTaskModal={props.handleTaskModal}
      />
    </>
  );
}
// }

const mapStateToProps = ({
  auth,
  theme,
  customer,
  call,
  task,
  event,
  candidate,
  partner,
  opportunity,
  contact,
  language,
  message,
}) => ({
  language: language.language,
  addCustomerModal: customer.addCustomerModal,
  addOpportunityModal: opportunity.addOpportunityModal,
  addContactModal: contact.addContactModal,
  user: auth.userDetails,
  userDetails: auth.userDetails,
  addMessageModal: opportunity.addMessageModal,
  // employeeId: auth.userDetails.employeeId,
  userId: auth.userDetails.employeeId,
  theme: theme.theme,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  department: auth.userDetails && auth.userDetails.department,
  roleType: auth.userDetails && auth.userDetails.roleType,
  // orgImageId:auth.userDetails.orgImageId,

  imageId:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.orgImageId) ||
    "",
  organizationName:
    (auth.userDetails &&
      auth.userDetails.metaData &&
      auth.userDetails.metaData.organization &&
      auth.userDetails.metaData.organization.organizationName) ||
    "",

  preferedLanguage: auth.userDetails.preferedLanguage,
  addPartnerModal: partner.addPartnerModal,
  organizationDetails: auth.organizationDetails,
  addCandidateResumeModal: candidate.addCandidateResumeModal,
  addCallModal: call.addCallModal,
  addEventModal: event.addEventModal,
  addTaskModal: task.addTaskModal,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPresentNotifications,
      handleEventModal,

      handlePartnerModal,
      handleTaskModal,
      updateUserById,
      handleCustomerModal,
      handleOpportunityModal,
      handleCandidateResumeModal,
      handleContactModal,
      handleCallModal,
      setLanguage,
      getOpportunityRecord,
      // getRequirementRecord,
      handleMessageModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

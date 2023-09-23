import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { PlusOutlined } from "@ant-design/icons";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentIcon from '@mui/icons-material/Payment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ContrastIcon from '@mui/icons-material/Contrast';
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import SchoolIcon from '@mui/icons-material/School';

import {
  handlePersonalModal,
  handleEmploymentModal,
  handleTrainingModal,
  handleBankModal,
  handleEducationModal,
  handlePersonalDetailsModal,
  handleSalaryModal,
  handleDocumentUploadModal,
  handleContractModal,
} from "../../../../../Profile/ProfileAction";
import AddPersonalModal from "../EmployeeTab/Personal/AddPersonalModal";
import AddEducationModal from "./Education/AddEducationModal";
import AddTrainingModal from "./Training/AddTrainingModal";
import AddEmploymentModal from "./Employment/AddEmploymentModal";
import AddBankModal from "./Bank/AddBankModal";
import PersonalDetailsTable from "./PersonalDetails/PersonalDetailsTable";
import AddPersonalDetailsModal from "./PersonalDetails/AddPersonalDetailsModal";
import AddSalaryModal from "./Salary/AddSalaryModal";
import SalaryTable from "./Salary/SalaryTable";
import AddContractModal from "./Contract/AddContractModal";
import ContractTable from "./Contract/ContractTable";
import ContactsIcon from '@mui/icons-material/Contacts';
import CandidateTable from "../../../../../Candidate/Child/CandidateTable/CandidateTable";
import OpportunityTable from "../../../../../Opportunity/Child/OpportunityTable/OpportunityTable";
import CustomerTable from "../../../../../Customer/Child/CustomerTable/CustomerTable";
import PartnerTable from "../../../../../Partner/child/PartnerTable/PartnerTable"
import RecruitmentTable from "../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentTable";
import EmployeeExperienceForm from "./Experience/EmployeeExperienceForm";
const BankTable = lazy(() => import("./Bank/BankTable"));
const EducationTable = lazy(() => import("./Education/EducationTable"));
const EmploymentTable = lazy(() => import("./Employment/EmploymentTable"));
const TrainingTable = lazy(() => import("./Training/TrainingTable"));
const PersonalTable2 = lazy(() => import("./Personal/PersonalTable2"));
const EmployeesNotes = lazy(() => import("./Notes/EmployeesNotes"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const TabPane = StyledTabs.TabPane;

class EmployeeDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
componentDidMount(){
  
}
  handleTabChange = (key) => this.setState({ activeKey: key });

 
  render() {
    const { activeKey } = this.state;
    const {
      addEducationModal,
      handleEducationModal,
      addTrainingModal,
      handleTrainingModal,
      addEmploymentModal,
      handleEmploymentModal,
      addPersonalModal,
      handlePersonalModal,
      addPersonalDetailsModal,
      addSalaryModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      addBankModal,
      handleBankModal,
      handleDocumentUploadModal,
      documentUploadModal,
      addContractModal,
      handleContractModal,
    } = this.props;
    console.log(this.props.employeeId);

    console.log("sos", this.props.singleEmployee.suspendInd)
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                <SchoolIcon   style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                  Education
                  </span>
                  {activeKey === "1" && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleEducationModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EducationTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                  <HeadphonesIcon   style={{fontSize:"1.1rem"}}
                  />
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>Training
                    
                  </span>
                  {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleTrainingModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TrainingTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <AccountBalanceIcon   style={{fontSize:"1.1rem"}} />
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.employment"
                      defaultMessage="Employment"
                    />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleEmploymentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmploymentTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                
                <PhoneIcon 
                 style={{fontSize:"1.1rem"}}
                 />
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.emergency"
                      defaultMessage="Emergency"
                    />
                  </span>
                  {activeKey === "4" && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handlePersonalModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <PersonalTable /> */}
                <PersonalTable2 />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <AccountBalanceIcon   style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>Bank Details
                   {/*  &nbsp;*/} 
                  </span>
                  {activeKey === "5" && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleBankModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <BankTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <RecentActorsIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>Personal Details
                  </span>
                  {activeKey === "6" && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handlePersonalDetailsModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PersonalDetailsTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <NoteAltIcon  style={{fontSize:"1.1rem"}}/>
                  <span style={{ marginLeft: "0.25em" }}>
                   {/* &nbsp; */} 
                   
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
                  </span>
                  {activeKey === "7" && (
                    <>
                     
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeesNotes />
              </Suspense>
            </TabPane> 
       
     
            <TabPane
              tab={
                <>
                 <PaymentIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>Salary
                  </span>
                  {activeKey === "8" && (
                    <>
                       <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleSalaryModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <SalaryTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                <FileCopyIcon   style={{fontSize:"1.1rem"}} />
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                  </span>
                  {/* {activeKey === "9" && (
                    <>
                        <PlusOutlined
                        type="plus"
                        tooltipTitle="Upload Document"
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )} */}
                </>
              }
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <ContrastIcon  style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                   
                    <FormattedMessage
                      id="app.contract"
                      defaultMessage="Contract"
                    />
                  </span>
                  {activeKey === "10" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        onClick={() => handleContractModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="10"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ContractTable />
              </Suspense>
            </TabPane>
            
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
               <i class="fas fa-portrait" aria-hidden="true"></i>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                    
                   
                    <FormattedMessage
                      id="app.talent"
                      defaultMessage="Talent"
                    />
                  </span>
                  {activeKey === "11" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="11"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTable />
              </Suspense>
            </TabPane>
                :null} 

              {this.props.singleEmployee.suspendInd?    
            <TabPane
              tab={
                <>
                 <i class="far fa-lightbulb" aria-hidden="true"></i>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.opportunity"
                defaultMessage="Opportunity"
              />
                  </span>
                  {activeKey === "12" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="12"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <OpportunityTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-building" aria-hidden="true"></i>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
                  </span>
                  {activeKey === "13" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="13"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CustomerTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                <ContactsIcon/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                  id="app.requirement"
                  defaultMessage="Requirement"
                />
                  </span>
                  {activeKey === "14" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="14"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <RecruitmentTable />
              </Suspense>
            </TabPane>:null}
            {this.props.singleEmployee.suspendInd? 
            <TabPane
              tab={
                <>
                 <i class="far fa-handshake" aria-hidden="true"></i>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>
                  <FormattedMessage
                id="app.vendor"
                defaultMessage="Vendor"
              />
                  </span>
                  {activeKey === "15" && (
                    <>
                      {/* <ActionIcon
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() => handleTalentModal(true)}
                        size="14px"
                        style={{ marginLeft:"0.25em", verticalAlign: "center" }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="15"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PartnerTable />
              </Suspense>
            </TabPane>:null}

            <TabPane
              tab={
                <>
                
               <WorkspacePremiumIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" font-poppins" style={{ marginLeft: "0.25em" }}>                  
                Experience
                  </span>                 
                </>
              }
              key="16"
            >
             
              {/* <LinkedExperience/> */}
              <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeExperienceForm/>
              </Suspense>
            </TabPane>
      
        
          </StyledTabs> 
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddEmploymentModal
            addEmploymentModal={addEmploymentModal}
            handleEmploymentModal={handleEmploymentModal}
          />
          <AddPersonalModal
            addPersonalModal={addPersonalModal}
            handlePersonalModal={handlePersonalModal}
          />
          <AddEducationModal
            addEducationModal={addEducationModal}
            handleEducationModal={handleEducationModal}
          />

          <AddTrainingModal
            addTrainingModal={addTrainingModal}
            handleTrainingModal={handleTrainingModal}
          />

          <AddBankModal
            addBankModal={addBankModal}
            handleBankModal={handleBankModal}
          />
          <AddPersonalDetailsModal
            addPersonalDetailsModal={addPersonalDetailsModal}
            handlePersonalDetailsModal={handlePersonalDetailsModal}
          />
          <AddSalaryModal
            addSalaryModal={addSalaryModal}
            handleSalaryModal={handleSalaryModal}
          />

          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContractModal
            addContractModal={addContractModal}
            handleContractModal={handleContractModal}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ profile,employee }) => ({
  addEducationModal: profile.addEducationModal,
  addTrainingModal: profile.addTrainingModal,
  addEmploymentModal: profile.addEmploymentModal,
  addPersonalModal: profile.addPersonalModal,
  addBankModal: profile.addBankModal,
  addPersonalDetailsModal: profile.addPersonalDetailsModal,
  addSalaryModal: profile.addSalaryModal,
  documentUploadModal: profile.documentUploadModal,
  addContractModal: profile.addContractModal,
  singleEmployee:employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTrainingModal,
      handleEducationModal,
      handleEmploymentModal,
      handlePersonalModal,
      handleBankModal,
      handlePersonalDetailsModal,
      handleSalaryModal,
      handleDocumentUploadModal,
      handleContractModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailTab);

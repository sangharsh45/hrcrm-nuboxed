import React, { Component, lazy, Suspense } from "react";
import { Icon } from "antd";
// import { FileOutlined, PlusOutlined} from '@ant-design/icons';
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleCandidateEducationModal,handleCandidateTrainingModal,handleCandidateEmploymentModal } from "../../../../../../Candidate/CandidateAction";
import { ActionIcon } from "../../../../../../../Components/Utils";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
 import LinkedDocuments from "../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Document/LinkedDocuments";
import RemarksTable from "../Child/RemarksTable";
import AddSentimentModal from "../Child/AddSentimentModal" 
 import { handleRemarksModal,handleDocumentUploadModal ,handleSentimentModal} from "../../../../../OpportunityAction";
import AddRemarksModal from "../Child/AddRemarksModal";
import AddDocumentModal from "../Child/AddDocumentModal";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { BankOutlined, CustomerServiceOutlined, PlusOutlined } from "@ant-design/icons";
const AddCandidateEducationModal = lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Education/AddCandidateEducationModal"));
const CandidateEducationTable = lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Education/CandidateEducationTable"));
const CandidateTrainingTable =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Training/CandidateTrainingTable"));
const AddCandidateTrainingModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Training/AddCandidateTrainingModal"));
const CandidateEmploymentTable =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Employment/CandidateEmploymentTable"));

const AddCandidateEmploymentModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Employment/AddCandidateEmploymentModal"));
const TabPane = StyledTabs.TabPane;

class RecruitmentDetailsTab extends Component {
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
      handleRemarksModal,
      handleDocumentUploadModal,
      handleCandidateEducationModal,
      addCandidateEducationModal,
      handleCandidateEmploymentModal,
      addCandidateEmploymentModal,
      addingEmail, 
      addSentimentModal,
      handleSentimentModal,

      addRemarksModal,
      documentUploadModal ,
      handleCandidateTrainingModal,
      addCandidateTrainingModal

    } = this.props;
    console.log(this.props.stageList);
    console.log("Detail11",this.props.candidateId)
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Feedback</span>
                  {activeKey === "1" && (
                    <>
                      {/* <Tooltip //title="Tag Remarks"
                        title={<FormattedMessage
                          id="app.tagremarks"
                          defaultMessage="tagremarks"
                        />} */}
                      
                        <PlusOutlined
                          type="plus"
                           tooltipTitle="Tag Feedback"
                           onClick={() => handleSentimentModal(true)}
                          size="0.875em"
                          style={{ marginLeft: 10, verticalAlign: "center" ,color:"blue"}}
                        />
                        {/* <AddSentimentModalModal

                        /> */}

                        {/* <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                      /> */}
                      {/* </Tooltip> */}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <RemarksTable 
                profileId={this.props.profileId} 
                stageList={this.props.stageList}
                />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <span>
                 
                    <FormattedMessage
                      id="app.sdcuments"
                      defaultMessage="Documents"
                    />
                  
                  </span>
                  {activeKey === "3" && (
                    <>
            
            <PlusOutlined
                        
                          type="plus"
                          tooltipTitle="Tag Document"
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
                          size="1em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

               <AddDocumentModal
              documentUploadModal={documentUploadModal}
              handleDocumentUploadModal={handleDocumentUploadModal}
               />
                     
                    </>
                  )}
                </>
              }
              key="3"
            >
            

              <Suspense fallback={"Loading ..."}>
                 <LinkedDocuments candidate={this.props.candidate} /> 
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-graduation-cap"></i>
                    &nbsp;Education
                  </span>
                  {activeKey === "5" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                        <>
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Add"
                            handleIconClick={() =>
                              handleCandidateEducationModal(true)
                            }
                            size="1em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
                            }}
                          />
       
                        </>
                      )}
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEducationTable />
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <CustomerServiceOutlined type="customer-service" />
                    Training
                  </span>
                  {activeKey === "6" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() =>
                          handleCandidateTrainingModal(true)
                        }
                        size="1em"
                        style={{ marginLeft:"0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTrainingTable />
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <BankOutlined type="bank" />
                   Employment
                  </span>
                  {activeKey === "7" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        tooltipTitle="Add"
                        handleIconClick={() =>
                          handleCandidateEmploymentModal(true)
                        }
                        size="1em"
                        style={{ marginLeft: "0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEmploymentTable />
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddCandidateEducationModal
            addCandidateEducationModal={addCandidateEducationModal}
            handleCandidateEducationModal={handleCandidateEducationModal}
          />
            <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                        candidateId={this.props.candidateId}
                      />
          <AddCandidateTrainingModal
            addCandidateTrainingModal={addCandidateTrainingModal}
            handleCandidateTrainingModal={handleCandidateTrainingModal}
          />
            <AddSentimentModal
            addSentimentModal={addSentimentModal}
            handleSentimentModal={handleSentimentModal}
            handleRemarksModal={handleRemarksModal}
          />
            <AddCandidateEmploymentModal
            addCandidateEmploymentModal={addCandidateEmploymentModal}
            handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          />
        </Suspense>
      </>
    );
  }
}
const mappropsToProps = ({ opportunity,candidate }) => ({
  addRemarksModal: opportunity.addRemarksModal,
  addSentimentModal:opportunity.addSentimentModal,
  documentUploadModal: opportunity.documentUploadModal,
  addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
  addCandidateTrainingModal: candidate.addCandidateTrainingModal,
  addCandidateEducationModal: candidate.addCandidateEducationModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       handleRemarksModal,
       handleSentimentModal,
       handleDocumentUploadModal,
       handleCandidateEducationModal,
       handleCandidateTrainingModal,
       handleCandidateEmploymentModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(RecruitmentDetailsTab);

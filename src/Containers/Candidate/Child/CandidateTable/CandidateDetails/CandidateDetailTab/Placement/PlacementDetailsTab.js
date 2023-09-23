import React, { Component, lazy, Suspense } from "react";
import { Icon } from "antd";
// import { FileOutlined, PlusOutlined} from '@ant-design/icons';
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { handleCandidateEducationModal,handleCandidateTrainingModal,handleCandidateEmploymentModal } from "../../../../../../Candidate/CandidateAction";
import { ActionIcon } from "../../../../../../../Components/Utils";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
//  import LinkedDocuments from "../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Document/LinkedDocuments";

import RemarksTable from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/RemarksTable";
 import { handleRemarksModal, } from "../../../../../../Opportunity/OpportunityAction";
import AddRemarksModal from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/AddRemarksModal";
// import AddDocumentModal from "../Child/AddDocumentModal";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";



const TabPane = StyledTabs.TabPane;

class PlacementDetailsTab extends Component {
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
      addRemarksModal
     

    } = this.props;
    // console.log(this.props.stageList);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Remarks</span>
                  {activeKey === "1" && (
                    <>
                      {/* <Tooltip //title="Tag Remarks"
                        title={<FormattedMessage
                          id="app.tagremarks"
                          defaultMessage="tagremarks"
                        />} */}
                      
                        <ActionIcon
                          type="plus"
                           tooltipTitle="Tag Remarks"
                           onClick={() => handleRemarksModal(true)}
                          size="0.875em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

                        <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                         handleRemarksModal={handleRemarksModal}
                         stageList={this.props.stageList}
                        // profileId={this.props.profileId}
                      />
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
                />
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
    
      </>
    );
  }
}
const mappropsToProps = ({ opportunity,candidate }) => ({
   addRemarksModal: opportunity.addRemarksModal,
//   documentUploadModal: opportunity.documentUploadModal,
//   addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
//   addCandidateTrainingModal: candidate.addCandidateTrainingModal,
//   addCandidateEducationModal: candidate.addCandidateEducationModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       handleRemarksModal,
    //    handleDocumentUploadModal,
    //    handleCandidateEducationModal,
    //    handleCandidateTrainingModal,
    //    handleCandidateEmploymentModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(PlacementDetailsTab);

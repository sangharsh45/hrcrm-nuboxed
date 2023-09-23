import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";

//import CandidateTreeMap from "../Candidate/CandidateTreeMap"
//import { getCandidateDocument } from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";

import ProjectTaskForm from "../Child/ProjectTaskForm"

import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import ProjectTaskTable from "./ProjectTaskTable";
// import OpportunitySummaryTable from "./OpportunitySummaryTable";
// import OpportunityForecastForm from "./Opportunityforecastform";


class UpdateProjectTaskModal extends Component {
  
  
   
  

  

 
  render() {
console.log("Item",this.props.item)
     
      
   
   
    return (
      <div>
 <StyledDrawer
          title={this.props.item.taskName}
          width="25%"
          style={{marginTop:"5rem"}}
          visible={this.props.updateProjectTaskModal}
        //   maskClosable={false}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          
        
        onClose={() => this.props.handleUpdateProjectTaskModal(false)}
        footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
        <ProjectTaskForm
        item={this.props.item}
        />
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity,candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectTaskModal);

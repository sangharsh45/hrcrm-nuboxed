import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
// import { getCandidateDocument } from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";
// import CandidateDocumentView from "../Candidate/CandidateDocumentView"
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import { MainWrapper } from "../../../../Components/UI/Elements";
import EmployeeTreeMap from "./EmployeeTreeMap";
import EmployeeDocumentView from "./EmployeeDrawer/EmployeeDocumentView";



class EmployeePulseDrawerModal extends Component {
  render() {
    const {
      singleEmployee: { employeeId, middleName, lastName,candidateId },
      toggleViewType,
      singleEmployee,
    } = this.props;

      console.log("full",this.props.employeeName)
      console.log("full2", this.props.employeeTreeMap)
    return (
      <div>
 <StyledDrawer
          title={this.props.employeeName.fullName}
          width={"40vw"}
          visible={this.props.addDrawerEmployeePulseModal}
        //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          style={{marginTop:"5rem"}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}          
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.handleEmployeePulseDrawerModal(false)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
          <EmployeeDocumentView
           employeeId={employeeId}
           documentsByEmployeeId={this.props.documentsByEmployeeId}
          //candidate={candidate}
          />

          <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          />
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  singleEmployee: employee.singleEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePulseDrawerModal);
const CardWrapper = styled.div`
border-radius: 1.2rem;
box-shadow: 0 0.5em 0.375em -0.375em rgb(46 44 44);
border: 0.0625em solid #eee;
background-color: #fff;
color: #444;
margin: 0.2rem;
padding: 0.3rem;
width: 8rem;
}
  }
`
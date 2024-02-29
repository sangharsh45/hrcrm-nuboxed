import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import EmployeesPendingDocument from "./EmployeesPendingDocument";



class EmployeeDocumentDrawerModal extends Component {
  render() {
    const {
      singleEmployee: { employeeId, middleName, lastName,candidateId },
      toggleViewType,
      singleEmployee,
      employeeName,
    } = this.props;

      console.log("full",this.props.employeeName)
      console.log("full2", this.props.employeeTreeMap)
    return (
      <div>
 <StyledDrawer
           title={`${employeeName.fullName}-Required Documents`}
          width={"60%"}
          visible={this.props.addDrawerEmployeeDocumentModal}
        onClose={() => this.props.handleEmployeeDocumentDrawerModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
          {/* <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          /> */}
          <EmployeesPendingDocument employeeName={this.props.employeeName}/>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDocumentDrawerModal);
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
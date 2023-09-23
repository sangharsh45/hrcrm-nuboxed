import React, { Component } from "react";
import { connect } from "react-redux";

/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


class InputComponent1 extends Component {
    constructor(){
        super();
        this.state = {value: ''};
        this.onChange = this.onChange.bind(this)
     }
     
     onChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({value: e.target.value})
        }
     }
     
     render(){
       return <input value={this.state.value} onChange={this.onChange}/>
     }
  
  
}

const mapStateToProps = ({ auth, candidate,departments,sector, librarys,team, opportunity }) => ({
  // token: auth.token,
  // opportunityId: opportunity.opportunity.opportunityId,
  // contact: contact.contact,
//   addingCandidate: candidate.addingCandidate,
//   resumeForm: candidate.resumeForm,
//   sectors: sector.sectors,
//   organizationId: auth.userDetails.organizationId,
//   addingCandidateError: candidate.addingCandidateError,
//   // fetchingcontacts: contact.fetchingcontacts,
//   // fetchingcontactsError: contact.fetchingcontactsError,
//   // contacts: contact.contacts,
//   // users: team.users,
//   user: auth.userDetails,
//   userId: auth.userDetails.userId,
//    department: auth.userDetails && auth.userDetails.department,
//   // partnerLogin: auth.userDetails && auth.userDetails.partnerLogin,
//   // creatorName: opportunity.opportunity.creatorName,
//   // creatorId: opportunity.opportunity.creatorId,
//   // accountName:
//   //   opportunity.opportunity &&
//   //   opportunity.opportunity.metaData &&
//   //   opportunity.opportunity.metaData.account &&
//   //   opportunity.opportunity.metaData.account.accountName,
//   // accountIdTag:
//   //   opportunity.opportunity &&
//   //   opportunity.opportunity.metaData &&
//   //   opportunity.opportunity.metaData.account &&
//   //   opportunity.opportunity.metaData.account.accountId,
//   currencies: auth.currencies,
//   librarys: librarys.librarys,
//   departments: departments.departments,
});

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       // getContacts,
//       addCandidate,
//       getLibrarys,
//       getSectors,
//       getDepartments
//       // getAllPartnerListByUserId,
//       // getContactById,
//       // addLinkContactByOpportunityId,
//       // getCurrency,
//     },
//     dispatch
//   );

export default connect(mapStateToProps, mapDispatchToProps)(InputComponent1);

import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import ExtraCandidateCardView from "./CandidateCards/ExtraCandidateCardView";
const CandidateDetailCard =lazy(()=>import("./CandidateCards/CandidateDetailCard"));
const CandidateAddressCard =lazy(()=>import("./CandidateCards/CandidateAddressCard"));
const CandidateOverViewCard =lazy(()=>import("./CandidateCards/CandidateOverViewCard"));
const ProfileTopicOfIntrest =lazy(()=>import("./CandidateCards/CandidateTopicOfInterest"));
const CandidateDetailExtraCard=lazy(()=>import("./CandidateCards/CandidateDetailExtraCard"));
const CandidateExtraDetailCard=lazy(()=>import("./CandidateCards/CandidateExtraDetailCard"));
const CertificationLibrary =lazy(()=>import("./CandidateCards/CertificationLibrary"));
class CandidateDetailLeft extends Component {
  render() {
    const { candidate } = this.props;
    // console.log(userDetails);
    return (
      <div class=" flex flex-col block"  >
        <CandidateOverViewCard 
       
        candidate={candidate} />
        <ProfileTopicOfIntrest 
        candidate={candidate}
        selectedLanguage={this.props.selectedLanguage} 
        />
        <CertificationLibrary 
        candidate={candidate} 
        selectedLanguage={this.props.selectedLanguage}
        />
        <CandidateExtraDetailCard 
        candidate={candidate} 
        selectedLanguage={this.props.selectedLanguage}
        />
        <ExtraCandidateCardView candidate={candidate}/>
        
        <CandidateDetailCard candidate={candidate} />
        <CandidateAddressCard candidate={candidate} />
        {/* <CandidateOverViewDetailCard candidate={candidate}/> */}
        <CandidateDetailExtraCard candidate={candidate}/>

       
      </div>
    );
  }
}
const mapStateToProps = ({ candidate }) => ({
  // singleCandidate: candidate.singleCandidate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetailLeft);

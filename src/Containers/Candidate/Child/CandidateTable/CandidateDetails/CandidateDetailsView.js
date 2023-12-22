import {  } from "enzyme";
import React, { Component } from "react";
import { Link } from "../../../../../Components/Common";

class CandidateDetailsView extends Component {
  render() {
    return (
      <>
        <Link
          toUrl={`candidate/${this.props.candidateId}`}
          title={`${this.props.candidateName}`}
        />
      </>
    );
  }
}
export default CandidateDetailsView;

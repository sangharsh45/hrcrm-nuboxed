import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class ProgramDetailsView extends Component {
  render() {
    console.log("programDetailsId", this.props.programDetailsId);
    return (
      <>
        <Link
          toUrl={`program/${this.props.programDetailsId}`}
          title={`${this.props.program}`}
        />
      </>
    );
  }
  
}
export default ProgramDetailsView;

import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class ProgramDetailsView extends Component {
  render() {
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

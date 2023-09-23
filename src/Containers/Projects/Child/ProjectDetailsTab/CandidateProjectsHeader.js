import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../../Components/Utils";
import CandidateProjectsActionLeft from "./CandidateProjectsActionLeft";
import CandidateProjectsActionRight from "./CandidateProjectsActionRight";

class CandidateProjectsHeader extends Component {
  render() {
    const {
   
    } = this.props;
    return (
      <div>
        <ActionHeader
       leftComponent={<CandidateProjectsActionLeft />}
          rightComponent={
            <CandidateProjectsActionRight
            />
          }
        />
      </div>
    );
  }
}

export default CandidateProjectsHeader;

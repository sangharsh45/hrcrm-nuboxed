import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import TeamsActionLeft from "./TeamsActionLeft";
import TeamsActionRight from "./TeamsActionRight";


class TeamsHeader extends Component {
  render() {
    const { handleTeamsModal, viewType, setTeamsViewType } = this.props;

    return (
      <>
        <ActionHeader
        //   leftComponent={
        //     <TeamsActionLeft
        //       viewType={viewType}
        //       setTeamsViewType={setTeamsViewType}
        //     />
        //   }
          rightComponent={
            <TeamsActionRight 
            viewType={viewType}
            handleTeamsModal={handleTeamsModal} />
          }
        />
      </>
    );
  }
}

export default TeamsHeader;

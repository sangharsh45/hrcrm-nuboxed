import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const TeamsActionLeft =lazy(()=> import('./TeamsActionLeft'));
const TeamsActionRight =lazy(()=> import('./TeamsActionRight'));

class TeamsHeader extends Component {
  render() {
    const { handleTeamsModal, viewType, setTeamsViewType } = this.props;

    return (
      <>
        <ActionHeader
          leftComponent={
            <TeamsActionLeft
              viewType={viewType}
              setTeamsViewType={setTeamsViewType}
            />
          }
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

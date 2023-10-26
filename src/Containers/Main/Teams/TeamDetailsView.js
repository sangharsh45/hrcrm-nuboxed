import React, { Component } from "react";
import { Link } from "../../../Components/Common";
class TeamDetailsView extends Component {
  render() {
    return (
      <>
        <Link
          toUrl={`team/${this.props.teamId}`}
          title={`${this.props.teamName}`}
        />
      </>
    );
  }
}

export default TeamDetailsView;

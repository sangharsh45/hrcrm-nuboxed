import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class ProjectsDetailsView extends Component {
  render() {
    console.log("projectId", this.props.projectId);
    return (
      <>
        <Link
          toUrl={`projects/${this.props.projectId}`}
          title={`${this.props.projectName}`}
        />
      </>
    );
  }
  
}
export default ProjectsDetailsView;

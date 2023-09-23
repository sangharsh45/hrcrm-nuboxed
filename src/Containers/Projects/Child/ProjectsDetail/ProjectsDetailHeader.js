import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ProjectsDetailActionLeft from "./ProjectsDetailActionLeft";


class ProjectsDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<ProjectsDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default ProjectsDetailHeader;

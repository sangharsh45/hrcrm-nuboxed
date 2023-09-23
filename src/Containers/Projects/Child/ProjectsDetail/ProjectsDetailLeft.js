import React, { Component,lazy} from "react";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectOverViewCard from "./ProjectOverViewCard";

class ProjectsDetailLeft extends Component {
  render() {
    console.log("name",this.props.projectsById)
    const { projectsById } = this.props;
    return (
      <>
        <div class=" flex flex-col" >
         <ProjectOverViewCard projectsById={projectsById} />
         <ProjectDetailsCard projectsById={projectsById} />
         </div>
      </>
    );
  }
}
export default ProjectsDetailLeft;

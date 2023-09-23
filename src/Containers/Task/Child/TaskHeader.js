import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import TaskActionLeft from "./TaskActionLeft";
import TaskActionRight from "./TaskActionRight";
class TaskHeader extends Component {
  render() {
    const { viewType, setTaskViewType } = this.props;
    return (
      <div style={{position: "sticky",
      top: "3.35rem",
      zIndex: "998"}}>
        <ActionHeader
          leftComponent={<TaskActionLeft 
            viewType={viewType}
            setTaskViewType={setTaskViewType}
          />}
          rightComponent={<TaskActionRight 
            viewType={viewType}
          />}
        />
      </div>
    );
  }
}

export default TaskHeader;

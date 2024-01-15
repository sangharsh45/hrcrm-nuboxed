import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProgramActionLeft from "./ProgramActionLeft";
import ProgramActionRight from "./ProgramActionRight";
class ProgramHeader extends Component {
  render() {
    const { handleProgramModal, viewType, setProgramViewType } = this.props;
    return (
      <>
       <div class="static top-12 z-[998]">
          <ActionHeader
            leftComponent={
              <ProgramActionLeft
                viewType={viewType}
                setProgramViewType={setProgramViewType}
                currentData={this.props.currentData}
                handleClear={this.props.handleClear}
                setCurrentData={this.props.setCurrentData}
              />
            }
            rightComponent={
              <ProgramActionRight
                viewType={viewType}
                handleProgramModal={handleProgramModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default ProgramHeader;

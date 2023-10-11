import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const PitchActionRight=lazy(()=> import("./PitchActionRight"));
const PitchActionLeft=lazy(()=> import("./PitchActionLeft"));

class PitchHeader extends Component {
  render() {
    // const {
    //   handleLeadsModal,
    //   viewType,
    //   setLeadsViewType,
    //   handleChange,
    //   currentData,
    //   handleClear,
    // } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PitchActionLeft
            // viewType={viewType}
            // handleChange={handleChange}
            // setLeadsViewType={setLeadsViewType}
            //   currentData={currentData}
            //   handleClear={handleClear}
            //   setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <PitchActionRight
            // viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            handlePitchModal={this.props.handlePitchModal} 
            />
          }
        />
      </div>
    );
  }
}

export default PitchHeader;

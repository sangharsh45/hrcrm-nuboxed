import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const PitchActionRight=lazy(()=> import("./PitchActionRight"));
const PitchActionLeft=lazy(()=> import("./PitchActionLeft"));

class PitchHeader extends Component {
  render() {
    const {
      handleLeadsModal,
      viewType,
      setPitchViewType,
   
      currentUser,
      setLeadsViewType,
      handleChange,
      currentData,
      handleClear,
      handleCurrentData
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PitchActionLeft
            setPitchViewType={setPitchViewType}
            viewType={viewType}
            // viewType={viewType}
            currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}
            handleFilterChange={this.props.handleFilterChange}
            filter={this.props.filter}
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}
             
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

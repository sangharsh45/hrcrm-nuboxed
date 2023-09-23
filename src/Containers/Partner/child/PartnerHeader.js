import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import PartnerActionLeft from "./PartnerActionLeft";
import PartnerActionRight from "./PartnerActionRight";
class PartnerHeader extends Component {
  render() {
    const { handlePartnerModal,setPartnerViewType,viewType } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PartnerActionLeft
            viewType={viewType}
            text={this.props.text}
            handleChange={this.props.handleChange}
            setPartnerViewType={setPartnerViewType}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              setCurrentData={this.props.setCurrentData}
            />}
          rightComponent={
            <PartnerActionRight 
            handlePartnerModal={handlePartnerModal} 
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}
            />
          }
        />
      </div>
    );
  }
}

export default PartnerHeader;

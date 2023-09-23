import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import AccessmentActionLeft from "./AccessmentActionLeft";
import AccessmentActionRight from "./AccessmentActionRight";
class AccessmentHeader extends Component {
  render() {
    const { handleAccessmentModal,setAccessmentViewType,viewType } = this.props;
    return (
      <div style={{position: "sticky",
      top: "3.35rem",
      zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <AccessmentActionLeft
            viewType={viewType}
            text={this.props.text}
            handleChange={this.props.handleChange}
            setAccessmentViewType={setAccessmentViewType}
            currentData={this.props.currentData}
            handleClear={this.props.handleClear}
            setCurrentData={this.props.setCurrentData}
            />}
          rightComponent={
            <AccessmentActionRight handleAccessmentModal={handleAccessmentModal} />
          }
        />
      </div>
    );
  }
}

export default AccessmentHeader;

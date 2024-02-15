import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";


class SubscriptionHeader extends Component {
  render() {
    const {
      handleLeadsModal,
      viewType,
      setLeadsViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
         <div>Hii Left</div>
          }
          rightComponent={
           
            <div>Hii Right</div>
          }
        />
      </div>
    );
  }
}

export default SubscriptionHeader;

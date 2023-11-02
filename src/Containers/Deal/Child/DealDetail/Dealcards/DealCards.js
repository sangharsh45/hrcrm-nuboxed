import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import DealView from "./DealView";
import DealEdit from "./DealEdit";

class DealCards extends Component {
  render() {
    const { dealDetailsbyID, account, updateAccount, setAccount } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealView
                dealDetailsbyID={dealDetailsbyID}
                account={account}
                toggleViewType={toggleViewType}
                updateAccount={updateAccount}
                setAccount={setAccount}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
              />
            ) : (
              <DealEdit
                dealDetailsbyID={dealDetailsbyID}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default DealCards;

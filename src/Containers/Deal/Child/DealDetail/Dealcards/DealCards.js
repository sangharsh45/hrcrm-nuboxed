import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import DealView from "./DealView";
import DealEdit from "./DealEdit";

class DealCards extends Component {
  render() {
    const { opportunity, account, updateAccount, setAccount } = this.props;
    console.log(opportunity);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <DealView
                opportunity={opportunity}
                account={account}
                toggleViewType={toggleViewType}
                updateAccount={updateAccount}
                setAccount={setAccount}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
              />
            ) : (
              <DealEdit
                opportunity={opportunity}
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

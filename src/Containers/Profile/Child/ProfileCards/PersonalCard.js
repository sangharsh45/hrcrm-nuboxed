import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const PersonalView = lazy(() => import("./PersonalView"))
const PersonalEdit = lazy(() => import("./PersonalEdit"))

class PersonalCard extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <PersonalView user={user} toggleViewType={toggleViewType} />
            ) : (
              <PersonalEdit user={user} toggleViewType={toggleViewType} />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default PersonalCard;

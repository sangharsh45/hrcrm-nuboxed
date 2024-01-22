import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";

const OrganizationStatsView = lazy(() =>
  import("./OrganizationStatsView")
);
const OrganizationStatsEdit = lazy(() =>
  import("./OrganizationStatsEdit")
);


class OrganizationAboutCard extends Component {
  render() {
    const { organization } = this.props;
    console.log(organization);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OrganizationStatsView
                       organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationStatsEdit
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OrganizationAboutCard;

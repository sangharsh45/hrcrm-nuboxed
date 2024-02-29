import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const OrganizationOverviewView = lazy(() =>
  import("./OrganizationOverviewView")
);
const OrganizationOverviewEdit = lazy(() =>
  import("./OrganizationOverviewEdit")
);

class OrganizationOverviewCard extends Component {
  render() {
    const { organization } = this.props;
    console.log(organization);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OrganizationOverviewView
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationOverviewEdit
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

export default OrganizationOverviewCard;

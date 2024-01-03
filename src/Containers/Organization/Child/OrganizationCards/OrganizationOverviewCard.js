import React, { Component } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import OrganizationOverviewView from "./OrganizationOverviewView";
import OrganizationOverviewEdit from "./OrganizationOverviewEdit";

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

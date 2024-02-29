import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const OrganizationAboutView = lazy(() =>
  import("./OrganizationAboutView")
);
const OrganizationAboutEdit = lazy(() =>
  import("./OrganizationAboutEdit")
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
              <OrganizationAboutView
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationAboutEdit
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
              // )(
              // <OrganizationAddressView
              //   organization={organization}
              //   toggleViewType={toggleViewType}
              // />
              
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OrganizationAboutCard;

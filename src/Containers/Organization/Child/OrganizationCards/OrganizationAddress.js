import React, { Component,lazy } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";

const OrganizationAddressView = lazy(() =>
  import("./OrganizationAddressView")
);
const OrganizationAddressEdit = lazy(() =>
  import("./OrganizationAddressEdit")
);

class OrganizationAddress extends Component {
    render() {
        const { organization } = this.props;
        console.log("org456",organization)
        return (
            <div>
                <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OrganizationAddressView
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationAddressEdit
              organizationList={this.props.organizationList} 
                organization={organization}
                toggleViewType={toggleViewType}
              />
             
              
            )
          }
        </ViewEditCard>
              
            </div>
        )
    }
}

export default OrganizationAddress;
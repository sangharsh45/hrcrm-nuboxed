import React, { Component } from 'react';
import { ViewEditCard } from "../../../../Components/UI/Elements";
import OrganizationAddressView from "./OrganizationAddressView";
import OrganizationAddressEdit from "./OrganizationAddressEdit";

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
                organization={organization}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OrganizationAddressEdit
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
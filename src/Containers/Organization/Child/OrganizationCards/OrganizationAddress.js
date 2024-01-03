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
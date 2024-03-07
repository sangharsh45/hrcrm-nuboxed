import React, { Component,lazy} from "react";
import { ActionHeader } from "../../Components/Utils";
const OrganizationActionRight = lazy(() =>
  import("./Child/OrganizationHeader/OrganizationActionRight")
);
const OrganizationActionLeft = lazy(() =>
  import("./OrganizationActionLeft")
);

class OrganizationHeader extends Component {
  render() {
    const {
        handleOrganizationModal,
      viewType,
      handleChange,
      currentData,
      handleClear,
      setOrganizationViewType,
    } = this.props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <OrganizationActionLeft
            viewType={viewType}
            activeTab={this.props.activeTab}
            organizationDetailsList={this.props.organizationDetailsList}
            organizationDetails={this.props.organizationDetails}
            handleOnClick={this.props.handleOnClick}
            // handleChange={handleChange}
            setOrganizationViewType={setOrganizationViewType}

            />
          }
       
          rightComponent={
            <OrganizationActionRight
            viewType={viewType}
            handleOrganizationModal={handleOrganizationModal}
           />
          }
        />
      </div>
    );
  }
}

export default OrganizationHeader;

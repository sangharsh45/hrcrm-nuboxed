import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import OrganizationDocumentTab from "./OrganizationDocumentTab";


const RepositoryOrganizationModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="Repository"
        width="60%"
        // style={{marginTop:"5rem"}}
        visible={props.repositoryOrganizationModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleRepositoryOrganizationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>

          <OrganizationDocumentTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default RepositoryOrganizationModal;

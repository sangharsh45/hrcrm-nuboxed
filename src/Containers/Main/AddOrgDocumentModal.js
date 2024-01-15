import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import OrganizationDocumentTab from "./OrganizationDocumentTab";
import AddOrgDocumentForm from "./AddOrgDocumentForm";


const AddOrgDocumentModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="Document"
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.organizationDocumentDrawer}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleOrganizationDocumentDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>

         <AddOrgDocumentForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOrgDocumentModal;

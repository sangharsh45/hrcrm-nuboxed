import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AssignCatalogueRepairForm from "./AssignCatalogueRepairForm";
const AssignRepairForm = lazy(() => import("./AssignRepairForm"));

const AddAssignRepairModal = (props) => {
    const { showAssignRepairModal, handleAssignRepairModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Assign for repair"
                width="60%"
                visible={showAssignRepairModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleAssignRepairModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.rowData.type === "Catalogue" ?
                        <AssignCatalogueRepairForm rowData={props.rowData} />
                        : <AssignRepairForm rowData={props.rowData} />
                    }
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAssignRepairModal;

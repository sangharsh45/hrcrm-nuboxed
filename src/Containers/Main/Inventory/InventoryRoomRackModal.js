import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const RoomAndRackForm = lazy(() => import("./RoomAndRackForm"))

function InventoryRoomRackModal(props) {
    return (
        <>
            <StyledDrawer
                title="Room And Rack"
                width="50%"
                visible={props.addroomrackininventory}
                destroyOnClose
                maskClosable={false}
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleInventoryRoomRackModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <RoomAndRackForm rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
}

export default InventoryRoomRackModal;
